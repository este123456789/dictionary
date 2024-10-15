

      document.addEventListener('DOMContentLoaded', function () {
        // Array of available themes
        const themes = [
            "light",
            "dark",
            "cupcake",
            "bumblebee",
            "emerald",
            "corporate",
            "synthwave",
            "retro",
            "cyberpunk",
            "valentine",
            "halloween",
            "garden",
            "forest",
            "aqua",
            "lofi",
            "pastel",
            "fantasy",
            "wireframe",
            "black",
            "luxury",
            "dracula",
            "cmyk",
            "autumn",
            "business",
            "acid",
            "lemonade",
            "night",
            "coffee",
            "winter",
            "dim",
            "nord",
            "sunset"
        ];
    
        defaultTheme();
        // Function 
        function defaultTheme() {
            const newTheme = themes[0];
            document.documentElement.setAttribute('data-theme', newTheme);
        }
        // Function to change the theme to a random one
        function changeTheme() {
            const randomIndex = Math.floor(Math.random() * themes.length);
            const newTheme = themes[randomIndex];
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    
        // Event listener for the button
        document.getElementById('change-theme-btn').addEventListener('click', changeTheme);
    });
    