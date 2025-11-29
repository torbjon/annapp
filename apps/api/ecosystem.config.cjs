module.exports = {
    apps: [
        {
            name: 'annaapp-api',
            script: './dist/index.js',
            instances: 'max', // Use all available CPU cores
            exec_mode: 'cluster',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3001,
            },
            error_file: './logs/err.log',
            out_file: './logs/out.log',
            log_file: './logs/combined.log',
            time: true,
            merge_logs: true,
        },
    ],

    deploy: {
        production: {
            user: 'rails',
            host: '188.166.7.155',
            ref: 'origin/main',
            repo: 'GIT_REPOSITORY', // Change this to your git repo URL
            path: '/var/www/annaapp-api',
            'pre-deploy-local': '',
            'post-deploy':
                'npm install && npm run build && pm2 reload ecosystem.config.cjs --env production',
            'pre-setup': '',
        },
    },
};
