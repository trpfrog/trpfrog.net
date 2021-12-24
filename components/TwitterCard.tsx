type Props = {
    title: string;
    description: string;
    url: string;
    image?: string;
}

const TwitterCard = ({
    title, description, url, image = 'https://trpfrog.net/images/TwitterCard.png'
}: Props) => {
    return (
        <>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content={process.env.twitterId}/>
            <meta property="og:url" content={url}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={image}/>
        </>
    );
}

export default TwitterCard;