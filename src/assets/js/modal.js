import { createApp } from "vue";

// popup 컴포넌트 자동 등록
const popupContext = require.context(
    "@/uiPub/popUp",
    false,
    /\.vue$/
);

let popupApp = null;

const modal = {
    /* ================= modal 기능 ================= */
    open(targetId, type = "default", triggerEl = null) {
        const target = document.getElementById(targetId);
        if (!target) return;

        target.setAttribute("modal-type", type);

        const activeModals = document.querySelectorAll(".modal_wrap.active");

        if (!target.classList.contains("active")) {
            target.classList.add("active");

            const zIdx = 100 + activeModals.length;
            target.style.zIndex = zIdx;

            // dim 처리
            let dim = document.querySelector(".modal_dim");

            if (dim) {
                dim.style.zIndex = zIdx - 1;
            } else if (!type.includes("no_dim")) {
                dim = document.createElement("div");
                dim.className = "modal_dim";
                dim.style.zIndex = zIdx - 1;
                document.body.appendChild(dim);
            }

            // 스크롤 잠금
            document.body.style.overflow = "hidden";
        }

        // Vue popup 로드
        if (triggerEl && triggerEl.dataset.cont) {
            const container = target.querySelector(".modal_container");
            if (!container) return;

            container.innerHTML = "";

            try {
                const component = popupContext(
                    `./${triggerEl.dataset.cont}.vue`
                ).default;

                popupApp = createApp(component);
                popupApp.mount(container);

            } catch (err) {
                console.error("Popup load error:", err);
                alert("팝업 페이지를 불러오지 못했습니다.");
            }
        }
    },

    close(targetEl) {
        const target = targetEl.closest(".modal_wrap");
        if (!target) return;

        target.classList.remove("active");
        target.removeAttribute("modal-type");
        target.removeAttribute("style");

        // Vue unmount
        if (popupApp) {
            popupApp.unmount();
            popupApp = null;
        }

        const activeModals = document.querySelectorAll(".modal_wrap.active");
        const dim = document.querySelector(".modal_dim");

        // dim 처리
        if (activeModals.length === 0 && dim) {
            dim.remove();
            document.body.style.overflow = "";
        } else if (dim) {
            const zIdx = 100 + activeModals.length;
            dim.style.zIndex = zIdx - 1;
        }
    },

    /* ================= toast 기능 ================= */
    toast(_type, _message, _time = 3000) {
        let _toast = document.querySelector(".toast");

        // toast div 없으면 생성
        if (!_toast) {
            _toast = document.createElement("div");
            _toast.className = "toast";
            document.body.appendChild(_toast);
        }

        _toast.className = "toast active " + _type;
        _toast.innerHTML = `<span>${_message}</span>`;

        if (_type === "auto") {
            setTimeout(() => {
                this.toast_close(_toast);
            }, _time);
        } else if (_type === "confirm") {
            const closeBtn = document.createElement("a");
            closeBtn.href = "#none";
            closeBtn.className = "btn_close";
            closeBtn.innerText = "close";
            closeBtn.onclick = () => this.toast_close(_toast);
            _toast.appendChild(closeBtn);

            setTimeout(() => {
                closeBtn.focus();
            }, 100);
        }
    },

    toast_close(el) {
        if (!el) return;
        el.classList.remove("active");
        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, 300);
    },
};

window.modal = modal;

export default modal;