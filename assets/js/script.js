document.addEventListener("DOMContentLoaded", () => {
    const choices = [...document.querySelectorAll(".choice")];
    const ending = document.querySelector(".ending[data-link]");

    if (!choices.length && !ending) return;

    let selected = -1;

    const update = () => {
        choices.forEach((button, i) => {
            button.classList.toggle("selected", i === selected);
        });
    };

    choices.forEach((button, i) => {
        button.addEventListener("mouseenter", () => {
            selected = i;
            update();
        });

        button.addEventListener("mouseleave", () => {
            selected = -1;
            update();
        });

        button.addEventListener("click", () => {
            const link = button.dataset.link;
            if (link) window.location.href = link;
        });
    });

    if (ending) {
        const goToStart = () => {
            const link = ending.dataset.link;
            if (link) window.location.href = link;
        };
        ending.addEventListener("click", goToStart);
        ending.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                goToStart();
            }
        });
    }

    document.addEventListener("keydown", event => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            selected = selected < 0 ? 0 : (selected + 1) % choices.length;
            update();
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            selected = selected < 0
                ? choices.length - 1
                : (selected - 1 + choices.length) % choices.length;
            update();
        } else if (event.key === "Enter" && selected >= 0) {
            event.preventDefault();
            choices[selected].click();
        }
    });

    update();
});
