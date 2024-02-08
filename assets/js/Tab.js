class Tab {
    constructor() {
        this.tabs = Array.from(document.querySelectorAll('[role="tab"]'));
        this.panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {

                this.tabs.forEach(t => t.setAttribute('aria-selected', 'false'));

                tab.setAttribute('aria-selected', 'true');

                this.panels.forEach(p => p.setAttribute('hidden', ''));

                document.getElementById(tab.getAttribute('aria-controls')).removeAttribute('hidden');
            });
        });
    }
}

export default Tab;