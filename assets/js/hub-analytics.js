// Matrix Intelligence Hub Analytics
class HubAnalytics {
    constructor() {
        this.init();
    }

    init() {
        console.log('🔍 Matrix Hub Analytics initialized');
        this.trackPageView();
        this.setupFileDownloadTracking();
        this.setupSessionTracking();
    }

    trackPageView() {
        // Отслеживание просмотра страницы
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname
            });
        }
        
        console.log('📊 Page view tracked:', document.title);
    }

    setupFileDownloadTracking() {
        // Отслеживание скачиваний файлов
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-analytics]');
            if (link) {
                this.trackFileDownload(
                    link.getAttribute('data-analytics'),
                    link.href
                );
            }
        });
    }

    trackFileDownload(fileName, fileUrl) {
        const eventData = {
            event_category: 'file_download',
            event_label: fileName,
            value: 1
        };

        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'file_download', eventData);
        }

        // Console log для отладки
        console.log('📥 File download tracked:', {
            fileName: fileName,
            fileUrl: fileUrl,
            timestamp: new Date().toISOString()
        });

        // Можно добавить отправку на свой сервер
        this.sendToServer({
            type: 'file_download',
            fileName: fileName,
            client: this.getClientFromUrl(),
            timestamp: new Date().toISOString()
        });
    }

    setupSessionTracking() {
        // Отслеживание времени на странице
        let sessionStart = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const sessionDuration = Date.now() - sessionStart;
            this.trackSessionDuration(sessionDuration);
        });
    }

    trackSessionDuration(duration) {
        const seconds = Math.round(duration / 1000);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'session_duration', {
                event_category: 'engagement',
                event_label: 'hub_usage',
                value: seconds
            });
        }

        console.log('⏱ Session duration:', seconds + 's');
    }

    getClientFromUrl() {
        // Определение клиента из URL
        const path = window.location.pathname;
        const clientMatch = path.match(/\/([^\/]+)\.html/);
        return clientMatch ? clientMatch[1] : 'unknown';
    }

    sendToServer(data) {
        // Заглушка для отправки данных на ваш сервер
        // Реализуйте по необходимости
        console.log('📡 Server data:', data);
    }
}

// Автоматическая инициализация
document.addEventListener('DOMContentLoaded', function() {
    window.matrixAnalytics = new HubAnalytics();
});

// Глобальные функции для ручного трекинга
window.trackMatrixEvent = function(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    console.log('🎯 Custom event:', { category, action, label });
};