class Tab {
    constructor() {
        this.tabs = Array.from(document.querySelectorAll('[role="tab"]'));
        this.panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                console.log('Tab clicked: ', tab.id);
                this.tabs.forEach(t => {
                    t.setAttribute('aria-selected', 'false');
                    const panel = document.getElementById(t.getAttribute('aria-controls'));
                    panel.style.display = 'none'; // Change the display property directly
                });
                tab.setAttribute('aria-selected', 'true');
                const selectedPanel = document.getElementById(tab.getAttribute('aria-controls'));
                selectedPanel.style.display = 'block'; // Change the display property directly

                // Hide all other panels
                this.panels.forEach(panel => {
                    if (panel !== selectedPanel) {
                        panel.style.display = 'none'; // Change the display property directly
                    }
                });
            });
        });
    }
}

export default Tab;