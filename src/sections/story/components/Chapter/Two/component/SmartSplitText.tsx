export const SmartSplitText = ({
    children,
    className,
}: {
    children: string
    className?: string
}) => {
    const chars: string[] = []
    const regex = /[\u0E30-\u0E3A\u0E47-\u0E4E]/

    for (const char of children) {
        if (regex.test(char) && chars.length > 0) {
            chars[chars.length - 1] += char
        } else {
            chars.push(char)
        }
    }

    return (
        <span className={className} aria-label={children}>
            {chars.map((char, index) => (
                <span
                    key={index}
                    className="magic-char inline-block opacity-0"
                    style={{
                        minWidth: char === ' ' ? '0.3em' : 'auto',
                        transform: 'translateY(10px)',
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    )
}