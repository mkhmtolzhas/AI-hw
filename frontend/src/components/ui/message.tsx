import React, { useEffect } from 'react'

interface MessageProps {
    message: string,
    sender: string
}

const Message: React.FC<MessageProps> = ({message, sender}) => {
    const [letters, setLetters] = React.useState<string[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const letter = message[letters.length];
            if (letter) {
                setLetters(prevLetters => [...prevLetters, letter]);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [letters, message]);


    if (sender == "bot") {
        return (
            <div className="flex items-start gap-4">
                <div className="rounded-full bg-muted w-10 h-10 flex items-center justify-center text-2xl">🤖</div>
                <div className="bg-muted rounded-2xl p-4 max-w-[70%]">
                    {letters.join('')}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="flex items-start gap-4 justify-end">
                <div className="bg-primary rounded-2xl p-4 max-w-[70%] text-primary-foreground">
                    {message}
                </div>
                <div className="rounded-full bg-primary w-10 h-10 flex items-center justify-center text-2xl text-primary-foreground">
                    🙂
                </div>
            </div>
        )
    }
}

export default Message