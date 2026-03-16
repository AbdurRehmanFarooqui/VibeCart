

// export default function OfferBar({ highlightText, text }: { highlightText?: string, text?: string }) {
//     return (
//         <div className="w-full bg-gradient-to-r from-[#ffffff] to-[#ffffff] text-black text-center py-2 px-4 md:px-8 text-xs md:text-sm font-bold tracking-widest uppercase sticky top-0 z-99">
//             {highlightText ? <span className="text-orange-500 pr-1">{highlightText}</span> : null}
//             {text}
//         </div>
//     )
// }

// export default function OfferBar({ highlightText, text }: { highlightText?: string, text?: string }) {
//     return (
//         <div className="w-full bg-white text-black py-2 px-4 md:px-8 text-xs md:text-sm font-bold tracking-widest uppercase sticky top-0 z-50 overflow-hidden border-t-1">
//             <div className="whitespace-nowrap animate-marquee inline-block">
//                 {highlightText && (
//                     <span className="text-orange-500 pr-1">{highlightText}</span>
//                 )}
//                 {text}
//             </div>
//             <div className="whitespace-nowrap animate-marquee-b translate-x-100">
//                 {highlightText && (
//                     <span className="text-orange-500 pr-1">{highlightText}</span>
//                 )}
//                 {text}
//             </div>
//         </div>
//     )
// }

export default function SaleBar({ highlightText, text }: { highlightText?: string, text?: string }) {
    const content = (
        <div className="flex-shrink-0 flex items-center px-4 md:px-8">
            {highlightText && (
                <span className="text-yellow-500 pr-2">{highlightText}</span>
            )}
            <span>{text}</span>
        </div>
    );

    return (
        <div className="w-full bg-black text-white py-2 text-xs md:text-sm font-bold tracking-widest uppercase sticky top-0 z-50 overflow-hidden">
            <div className="flex w-max animate-marquee whitespace-nowrap">
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                {content}
                
                {/* On md: screens, the animation stops and the container becomes w-full.
                   The second 'content' block will naturally stay hidden or 
                   be ignored because of the md:justify-center.
                */}
                {/* <div className="md:hidden">
                    {content}
                </div> */}
            </div>
        </div>
    )
}