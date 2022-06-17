type SectionProps = {
    headerText: string;
    sectionId: string;
    content: JSX.Element[]
    underHeader?: string;
    sectionClass:string;
}

export function Section(props: SectionProps): JSX.Element {
    const { headerText, sectionId, content, underHeader, sectionClass } = props;
    return (
        <>
            <h2 className="music-head">{headerText}
                <p className="substr">{underHeader}</p>
            </h2>
            <section className={sectionClass} id={sectionId}>
                {content}
            </section>
        </>
    )
}

