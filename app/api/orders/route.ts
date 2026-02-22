import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Supabase with service role key for backend operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY is not set');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// --- INTERFACES ---
interface OrderItem {
  variantId: number | string;
  quantity: number;
  price: number;
}

interface OrderRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  cartItems: OrderItem[];
  cartTotal: number;
  userId?: string | null;
}

// --- VALIDATION HELPER ---
function validateOrderData(data: OrderRequest): string | null {
  // Validate customer info
  if (!data.firstName?.trim()) return "First name is required";
  if (data.firstName.trim().length < 2) return "First name must be at least 2 characters";

  if (!data.lastName?.trim()) return "Last name is required";
  if (data.lastName.trim().length < 2) return "Last name must be at least 2 characters";

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email?.trim()) return "Email is required";
  if (!emailRegex.test(data.email)) return "Invalid email format";

  // Validate phone
  const phoneRegex = /^(\+92|0)[0-9]{10}$/;
  if (!data.phone?.trim()) return "Phone number is required";
  if (!phoneRegex.test(data.phone.replace(/\s|-/g, ""))) return "Invalid phone number format";

  // Validate location
  if (!data.city?.trim()) return "City is required";
  if (!data.address?.trim()) return "Address is required";
  if (data.address.trim().length < 5) return "Address must be at least 5 characters";
  if (!data.postalCode?.trim()) return "Postal code is required";

  // Validate cart
  if (!data.cartItems || data.cartItems.length === 0) return "Cart is empty";

  // Validate cart items
  for (const item of data.cartItems) {
    if (!item.variantId) return `Item has invalid variant ID`;
    if (item.quantity < 1) return `Item has invalid quantity`;
    if (!item.price || item.price <= 0) return `Item has invalid price`;
  }

  if (!data.cartTotal || data.cartTotal <= 0) return "Invalid cart total";

  return null;
}

// --- CALCULATE ORDER TOTAL ---
function calculateOrderTotal(cartItems: OrderItem[]): number {
  return cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

// --- FETCH AND VERIFY VARIANT PRICES FROM DATABASE ---
interface VariantData {
  id: number;
  price: number;
  sale_price: number | null;
  is_on_sale: boolean;
}

async function fetchAndVerifyVariants(cartItems: OrderItem[]): Promise<{ items: Array<OrderItem & { dbPrice: number }>; calculatedTotal: number } | null> {
  try {
    // Extract unique variant IDs
    const variantIds = cartItems.map(item => {
      const variantId = typeof item.variantId === 'string' ? parseInt(item.variantId, 10) : item.variantId;
      return variantId;
    });

    if (variantIds.length === 0) {
      return null;
    }

    // Fetch variant data from database
    const { data: variants, error: variantError } = await supabase
      .from('product_variants')
      .select('id, price, sale_price, is_on_sale')
      .in('id', variantIds);

    if (variantError || !variants) {
      console.error("Error fetching variants:", variantError);
      return null;
    }
    console.log("Fetched variants from database:", variants);
    // Create a map of variant ID to variant data
    const variantMap = new Map<number, VariantData>();
    variants.forEach((v: VariantData) => {
      variantMap.set(v.id, v);
    });

    // Verify and recalculate prices
    let calculatedTotal = 0;
    const verifiedItems = cartItems.map((item) => {
      const variantId = typeof item.variantId === 'string' ? parseInt(item.variantId, 10) : item.variantId;
      const dbVariant = variantMap.get(variantId);

      if (!dbVariant) {
        throw new Error(`Variant ${variantId} not found in database`);
      }

      // Use sale price if on sale, otherwise use regular price
      const actualPrice = dbVariant.is_on_sale && dbVariant.sale_price
        ? dbVariant.sale_price
        : dbVariant.price;

      calculatedTotal += actualPrice * item.quantity;

      return {
        ...item,
        dbPrice: actualPrice
      };
    });

    return {
      items: verifiedItems,
      calculatedTotal: Math.round(calculatedTotal * 100) / 100 // Round to 2 decimal places
    };
  } catch (error) {
    console.error("Error in fetchAndVerifyVariants:", error);
    return null;
  }
}

// --- POST HANDLER ---
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const orderData: OrderRequest = body;

    // Validate order data
    const validationError = validateOrderData(orderData);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    // 1. Fetch and verify variant prices from database
    const variantVerification = await fetchAndVerifyVariants(orderData.cartItems);
    if (!variantVerification) {
      return NextResponse.json(
        { error: "Failed to verify product variants. Please refresh and try again." },
        { status: 400 }
      );
    }

    const { items: verifiedItems, calculatedTotal } = variantVerification;

    // 2. Security check: verify cart total matches database-calculated total
    // Allow for small floating point differences (up to 1 paisa = 0.01)
    if (Math.abs(calculatedTotal - orderData.cartTotal) > 0.01) {
      console.warn(`Price mismatch detected. Frontend: ${orderData.cartTotal}, Database: ${calculatedTotal}`);
      return NextResponse.json(
        { error: "Cart total mismatch. Please refresh your cart and try again." },
        { status: 400 }
      );
    }

    // 3. Prepare order data for database using database-verified total
    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.userId || null,
        customer_name: `${orderData.firstName.trim()} ${orderData.lastName.trim()}`,
        customer_email: orderData.email.trim(),
        customer_phone: orderData.phone.trim(),
        city: orderData.city.trim(),
        postal_code: orderData.postalCode.trim(),
        shipping_address: { street: orderData.address.trim() },
        total_amount: calculatedTotal, // Use database-calculated total
        status: 'pending'
      })
      .select('id')
      .single();

    if (orderError) {
      console.error("Database Order Error:", orderError);
      return NextResponse.json(
        { error: `Failed to create order: ${orderError.message}` },
        { status: 500 }
      );
    }

    const orderId = newOrder.id;

    // 4. Prepare order items using database-verified prices
    const itemsToInsert = verifiedItems.map((item) => {
      const variantId = typeof item.variantId === 'string'
        ? parseInt(item.variantId, 10)
        : item.variantId;

      if (isNaN(variantId)) {
        throw new Error(`Invalid variant ID for item`);
      }

      return {
        order_id: orderId,
        variant_id: variantId,
        quantity: item.quantity,
        unit_price: item.dbPrice // Use database-verified price
      };
    });

    // 5. Insert order items
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsToInsert);

    if (itemsError) {
      console.error("Database Items Error:", itemsError);
      return NextResponse.json(
        { error: `Failed to add items to order: ${itemsError.message}` },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        orderId: orderId,
        message: "Order placed successfully!"
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
