const WA_NUMBER = '573042143149';

function buildWhatsAppUrl(mensaje) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

function todayLocalISO() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function normalizePlace(value) {
    return (value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navCenter = document.querySelector('.nav-center');
    const mainHeader = document.querySelector('.main-header');

    const handleScroll = () => {
        if (mainHeader.classList.contains('menu-open')) return;
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    };

    const closeMobileMenu = () => {
        if (!navCenter || window.innerWidth > 768) return;
        navCenter.style.display = 'none';
        mainHeader.classList.remove('menu-open');
        handleScroll();
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();

            if (href === '#destinations') {
                closeMobileMenu();
                setCatalogFilter('destinos-caribe');
                const experiences = document.querySelector('#experiences');
                if (experiences) {
                    experiences.scrollIntoView({ behavior: 'smooth' });
                }
                history.replaceState(null, '', '#destinations');
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                closeMobileMenu();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    if (menuBtn && navCenter) {
        menuBtn.addEventListener('click', () => {
            if (navCenter.style.display === 'flex') {
                navCenter.style.display = 'none';
                mainHeader.classList.remove('menu-open');
                handleScroll();
            } else {
                navCenter.style.display = 'flex';
                mainHeader.classList.add('menu-open');
                mainHeader.classList.add('scrolled');

                navCenter.style.flexDirection = 'column';
                navCenter.style.position = 'absolute';
                navCenter.style.top = '100%';
                navCenter.style.left = '0';
                navCenter.style.width = '100%';
                navCenter.style.background = 'rgba(255, 255, 255, 0.98)';
                navCenter.style.padding = '20px';
                navCenter.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';

                document.querySelectorAll('.nav-link').forEach((link) => {
                    link.style.color = '#1A1A1A';
                    link.style.textShadow = 'none';
                });
            }
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navCenter) {
            navCenter.style.display = 'flex';
            navCenter.style.flexDirection = 'row';
            navCenter.style.position = 'static';
            navCenter.style.boxShadow = 'none';
            navCenter.style.background = 'transparent';
            navCenter.style.padding = '0';
            mainHeader.classList.remove('menu-open');

            document.querySelectorAll('.nav-link').forEach((link) => {
                link.style.color = '';
                link.style.textShadow = '';
            });
            handleScroll();
        } else if (navCenter) {
            navCenter.style.display = 'none';
            mainHeader.classList.remove('menu-open');
        }
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.15 });

    fadeElements.forEach((el) => fadeObserver.observe(el));

    initCatalog();
    initSearch();
    initFaq();

    if (window.location.hash === '#destinations') {
        setCatalogFilter('destinos-caribe');
        const experiences = document.querySelector('#experiences');
        if (experiences) {
            setTimeout(() => experiences.scrollIntoView({ behavior: 'smooth' }), 50);
        }
    }
});

function setCatalogFilter(filter) {
    const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('#catalog-grid .service-card');

    chips.forEach((chip) => {
        const active = chip.getAttribute('data-filter') === filter;
        chip.classList.toggle('is-active', active);
        chip.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    cards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const show = filter === 'todas' || category === filter;
        card.hidden = !show;
    });
}

function initCatalog() {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            setCatalogFilter(chip.getAttribute('data-filter'));
        });
    });

    document.querySelectorAll('.card-btn[data-wa-title]').forEach((btn) => {
        const title = btn.getAttribute('data-wa-title');
        btn.href = buildWhatsAppUrl(`Hola, me interesa reservar: ${title}.`);
    });
}

function initFaq() {
    // Native <details> — no JS required
}

function initSearch() {
    const tabs = document.querySelectorAll('.search-tab');
    const formTransporte = document.getElementById('search-form-transporte');
    const formHourly = document.getElementById('search-form-hourly');
    const quoteSummary = document.getElementById('quote-summary');
    const quoteLines = document.getElementById('quote-lines');
    const quoteWaBtn = document.getElementById('quote-wa-btn');
    const quoteRelated = document.getElementById('quote-related');
    const samePlacePrompt = document.getElementById('same-place-prompt');
    const switchToHourlyBtn = document.getElementById('switch-to-hourly');
    const errorsTransporte = document.getElementById('errors-transporte');
    const errorsHourly = document.getElementById('errors-hourly');
    const returnField = formTransporte.querySelector('.field-return');
    const returnInput = formTransporte.querySelector('input[name="return-date"]');
    const minDate = todayLocalISO();

    formTransporte.querySelectorAll('input[type="date"]').forEach((input) => {
        input.min = minDate;
    });
    formHourly.querySelectorAll('input[type="date"]').forEach((input) => {
        input.min = minDate;
    });

    const setMode = (mode) => {
        tabs.forEach((tab) => {
            const active = tab.getAttribute('data-mode') === mode;
            tab.classList.toggle('is-active', active);
            tab.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        if (mode === 'transporte') {
            formTransporte.hidden = false;
            formTransporte.classList.add('is-active');
            formHourly.hidden = true;
            formHourly.classList.remove('is-active');
        } else {
            formHourly.hidden = false;
            formHourly.classList.add('is-active');
            formTransporte.hidden = true;
            formTransporte.classList.remove('is-active');
            samePlacePrompt.hidden = true;
        }
    };

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => setMode(tab.getAttribute('data-mode')));
    });

    const updateReturnVisibility = () => {
        const tripType = formTransporte.querySelector('input[name="trip-type"]:checked').value;
        const isRoundTrip = tripType === 'ida-vuelta';
        returnField.hidden = !isRoundTrip;
        returnInput.required = isRoundTrip;
        if (!isRoundTrip) {
            returnInput.value = '';
        }
    };

    formTransporte.querySelectorAll('input[name="trip-type"]').forEach((radio) => {
        radio.addEventListener('change', updateReturnVisibility);
    });
    updateReturnVisibility();

    const showErrors = (el, messages) => {
        if (!messages.length) {
            el.hidden = true;
            el.textContent = '';
            return;
        }
        el.hidden = false;
        el.textContent = messages.join(' ');
    };

    const hideQuote = () => {
        quoteSummary.hidden = true;
        quoteRelated.hidden = true;
        quoteRelated.innerHTML = '';
    };

    const relatedSuggestions = (textBlob) => {
        const t = textBlob.toLowerCase();
        const suggestions = [];
        if (/aeropuerto|airport/.test(t)) {
            suggestions.push({
                id: 'traslado-aeropuerto',
                title: 'Traslados desde o hacia el aeropuerto'
            });
        }
        if (/isla|barco|bar[uú]|rosario/.test(t)) {
            suggestions.push({
                id: 'barcos-islas',
                title: 'Alquiler de barcos turísticos y paseo por islas'
            });
        }
        return suggestions.slice(0, 2);
    };

    const renderRelated = (items) => {
        if (!items.length) {
            quoteRelated.hidden = true;
            quoteRelated.innerHTML = '';
            return;
        }
        const links = items.map((item) =>
            `<a href="#experiences" data-related-id="${item.id}">${item.title}</a>`
        ).join('');
        quoteRelated.innerHTML = `<p>También te puede interesar:</p>${links}`;
        quoteRelated.hidden = false;
        quoteRelated.querySelectorAll('a[data-related-id]').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const card = document.querySelector(`[data-experience-id="${link.getAttribute('data-related-id')}"]`);
                const category = card ? card.getAttribute('data-category') : 'todas';
                setCatalogFilter(category || 'todas');
                const experiences = document.querySelector('#experiences');
                if (experiences) experiences.scrollIntoView({ behavior: 'smooth' });
            });
        });
    };

    const renderQuote = (lines, message, relatedText) => {
        quoteLines.innerHTML = lines.map(([label, value]) =>
            `<dt>${label}</dt><dd>${value}</dd>`
        ).join('');
        quoteWaBtn.href = buildWhatsAppUrl(message);
        quoteSummary.hidden = false;
        renderRelated(relatedSuggestions(relatedText));
        samePlacePrompt.hidden = true;
    };

    formTransporte.addEventListener('submit', (e) => {
        e.preventDefault();
        samePlacePrompt.hidden = true;

        const tripType = formTransporte.querySelector('input[name="trip-type"]:checked').value;
        const origin = formTransporte.querySelector('input[name="origin"]').value.trim();
        const destination = formTransporte.querySelector('input[name="destination"]').value.trim();
        const departDate = formTransporte.querySelector('input[name="depart-date"]').value;
        const returnDate = formTransporte.querySelector('input[name="return-date"]').value;
        const departTime = formTransporte.querySelector('input[name="depart-time"]').value;
        const passengers = Number(formTransporte.querySelector('input[name="passengers"]').value);
        const errors = [];

        if (!origin) errors.push('Indica el origen.');
        if (!destination) errors.push('Indica el destino.');
        if (!departDate) errors.push('Indica la fecha de ida.');
        if (!departTime) errors.push('Indica la hora.');
        if (!passengers || passengers < 1) errors.push('Indica al menos 1 pasajero.');
        if (departDate && departDate < minDate) errors.push('La fecha de ida no puede ser en el pasado.');

        if (tripType === 'ida-vuelta') {
            if (!returnDate) errors.push('Indica la fecha de regreso.');
            if (returnDate && departDate && returnDate < departDate) {
                errors.push('La fecha de regreso no puede ser anterior a la de ida.');
            }
        }

        if (origin && destination && normalizePlace(origin) === normalizePlace(destination)) {
            showErrors(errorsTransporte, ['Para un traslado necesitas origen y destino distintos.']);
            hideQuote();
            samePlacePrompt.hidden = false;
            return;
        }

        if (errors.length) {
            showErrors(errorsTransporte, errors);
            hideQuote();
            return;
        }

        showErrors(errorsTransporte, []);

        const lines = [
            ['Tipo', tripType === 'ida-vuelta' ? 'Ida y vuelta' : 'Solo ida'],
            ['Origen', origin],
            ['Destino', destination],
            ['Fecha de ida', departDate],
            ['Hora', departTime],
            ['Pasajeros', String(passengers)]
        ];

        let message = `Hola, quiero cotizar un traslado.\nTipo: ${tripType === 'ida-vuelta' ? 'ida y vuelta' : 'solo ida'}\nOrigen: ${origin}\nDestino: ${destination}\nFecha: ${departDate}\nHora: ${departTime}\nPasajeros: ${passengers}`;

        if (tripType === 'ida-vuelta') {
            lines.push(['Fecha de regreso', returnDate]);
            lines.push(['Hora de vuelta', 'Por confirmar con la agencia']);
            message += `\nFecha de regreso: ${returnDate}\nHora de vuelta: por confirmar con la agencia`;
        }

        renderQuote(lines, message, `${origin} ${destination}`);
    });

    if (switchToHourlyBtn) {
        switchToHourlyBtn.addEventListener('click', () => {
            const origin = formTransporte.querySelector('input[name="origin"]').value.trim();
            const destination = formTransporte.querySelector('input[name="destination"]').value.trim();
            const place = origin || destination;
            const departDate = formTransporte.querySelector('input[name="depart-date"]').value;
            const departTime = formTransporte.querySelector('input[name="depart-time"]').value;
            const passengers = formTransporte.querySelector('input[name="passengers"]').value;

            setMode('por-horas');
            formHourly.querySelector('input[name="pickup"]').value = place;
            if (departDate) formHourly.querySelector('input[name="date"]').value = departDate;
            if (departTime) formHourly.querySelector('input[name="time"]').value = departTime;
            if (passengers) formHourly.querySelector('input[name="passengers"]').value = passengers;

            formTransporte.querySelector('input[name="origin"]').value = '';
            formTransporte.querySelector('input[name="destination"]').value = '';
            samePlacePrompt.hidden = true;
            showErrors(errorsTransporte, []);
            hideQuote();
        });
    }

    formHourly.addEventListener('submit', (e) => {
        e.preventDefault();

        const pickup = formHourly.querySelector('input[name="pickup"]').value.trim();
        const duration = formHourly.querySelector('select[name="duration"]').value;
        const date = formHourly.querySelector('input[name="date"]').value;
        const time = formHourly.querySelector('input[name="time"]').value;
        const passengers = Number(formHourly.querySelector('input[name="passengers"]').value);
        const errors = [];

        if (!pickup) errors.push('Indica el lugar de recogida.');
        if (!duration) errors.push('Selecciona la duración.');
        if (!date) errors.push('Indica la fecha.');
        if (!time) errors.push('Indica la hora.');
        if (!passengers || passengers < 1) errors.push('Indica al menos 1 pasajero.');
        if (date && date < minDate) errors.push('La fecha no puede ser en el pasado.');

        if (errors.length) {
            showErrors(errorsHourly, errors);
            hideQuote();
            return;
        }

        showErrors(errorsHourly, []);

        const lines = [
            ['Modo', 'Por horas'],
            ['Recogida', pickup],
            ['Duración', `${duration} hora${duration === '1' ? '' : 's'}`],
            ['Fecha', date],
            ['Hora', time],
            ['Pasajeros', String(passengers)]
        ];

        const message = `Hola, quiero cotizar un servicio por horas.\nRecogida: ${pickup}\nDuración: ${duration} horas\nFecha: ${date}\nHora: ${time}\nPasajeros: ${passengers}`;

        renderQuote(lines, message, pickup);
    });
}
