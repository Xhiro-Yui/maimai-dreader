function About() {
    return (
        <div className="flex justify-center p-6 bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen">
            <div
                className="max-w-3xl w-full bg-[var(--color-sidebar-bg)] backdrop-blur-md rounded-xl border-2 border-[var(--color-header)] shadow-lg p-8"
            >
                <h1 className="text-3xl font-extrabold mb-6 text-[var(--color-header)] border-b-2 border-[var(--color-header)] pb-2">
                    About This Page
                </h1>

                <p className="mb-4 leading-relaxed text-[var(--color-text)]">
                    This site is created to help MaiMai players visualize their game data more easily. By connecting to
                    your play logs (via external means), the site reads your scores, achievements, and other performance
                    stats, letting you see your progress at a glance.
                </p>

                <p className="mb-4 leading-relaxed text-[var(--color-text)]">
                    Whether you want to analyze your performance, compare scores, or keep a personal record of your
                    favorite songs, this site is designed to make it simple and intuitive.
                </p>

                <p className="mb-4 leading-relaxed text-[var(--color-text)]">
                    Happy playing, and may your combos always be perfect!
                </p>

                <p className="text-sm text-[var(--color-text)]">
                    Yes, the text on this page is written by ChatGPT...
                </p>
            </div>
        </div>
    );
}

export default About;
