(() => {
    if (!document.getElementById('alertContainer')) {
        const container = document.createElement('div');
        container.id = 'alertContainer';
        container.className = 'alert-container';
        document.body.appendChild(container);
    }

    const c = document.getElementById('alertContainer');
    const a = {};
    let confirmActive = false;
    const colors = {
        error: 'red',
        success: '#2ecc71',
        warning: 'gold',
        info: '#3498db'
    };

    function dismiss(e, t) {
        e.classList.remove('show');
        e.classList.add('hide');
        e.addEventListener('transitionend', () => e.remove());
        delete a[t];
    }

    window.Alert = {
        show(message, type = 'info', duration = 3000) {
            const color = colors[type] || colors.info;

            if (a[type]) {
                clearTimeout(a[type].timer);
                a[type].el.textContent = message;
                a[type].el.style.setProperty('--duration', duration + 'ms');
                a[type].el.classList.remove('show');
                void a[type].el.offsetWidth;
                a[type].el.classList.add('show');
                a[type].timer = setTimeout(() => dismiss(a[type].el, type), duration);
                return;
            }

            const el = document.createElement('div');
            el.className = 'alert';
            el.style.setProperty('--color', color);
            el.style.setProperty('--duration', duration + 'ms');
            el.textContent = message;
            c.appendChild(el);

            requestAnimationFrame(() => el.classList.add('show'));

            const timer = setTimeout(() => dismiss(el, type), duration);
            a[type] = { el, timer };
        },

        confirm(message, type = 'error') {
            if (confirmActive) return Promise.resolve(false);
            confirmActive = true;
            return new Promise(resolve => {
                const color = colors[type] || colors.error;

                const el = document.createElement('div');
                el.className = 'alert-confirm';
                el.style.setProperty('--color', color);
                el.innerHTML = `
                    <span>${message}</span>
                    <div class="alert-confirm-btns">
                        <button class="alert-btn" style="--btn-color:${color}">Yes</button>
                        <button class="alert-btn" style="--btn-color:#999">No</button>
                    </div>
                `;
                c.appendChild(el);

                requestAnimationFrame(() => el.classList.add('show'));

                function close(val) {
                    el.classList.remove('show');
                    el.classList.add('hide');
                    el.addEventListener('transitionend', () => el.remove());
                    confirmActive = false;
                    resolve(val);
                }

                el.querySelector('.alert-btn').onclick = () => close(true);
                el.querySelectorAll('.alert-btn')[1].onclick = () => close(false);
            });
        }
    };

    window.alert = (msg) => Alert.show(msg);
    window.confirm = (msg, cb) => {
        Alert.confirm(msg).then(yes => { if (cb) cb(yes); });
    };
})();
