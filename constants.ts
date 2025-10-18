
// FIX: Remove PaletteKey from import to break circular dependency
import type { Theme } from './types';

export const themeData: Record<string, Theme> = {
    christmas: {
        subjects: ["Santa Claus", "Snowman", "Gift Boxes", "Reindeer"],
        motifs: ["Gold Hats & Baubles", "Metallic Stars", "Snowflakes", "Gingerbread Cookies", "Holly & Berries"]
    },
    valentine: {
        subjects: ["Love Bears", "Heart Balloons", "Romantic Owls", "Cupids"],
        motifs: ["Pink Hearts", "Silk Ribbons", "Lace Patterns", "Red Roses", "Sweet Treats"]
    },
    autumn: {
        subjects: ["Pumpkins", "Foxes", "Squirrels", "Acorns"],
        motifs: ["Fall Leaves", "Toadstools", "Sunflowers", "Pumpkin Spice", "Burlap Textures"]
    },
    winter: {
        subjects: ["Polar Bears", "Penguins", "Snowflakes", "Hot Cocoa"],
        motifs: ["Ice Crystals", "Cozy Mittens", "Warm Scarves", "Evergreen Trees", "Snow Drifts"]
    },
    spring: {
        subjects: ["Bunnies", "Tulips", "Butterflies", "Baby Chicks"],
        motifs: ["Cherry Blossoms", "Garden Flowers", "Pastel Eggs", "Fresh Leaves", "Rain Drops"]
    },
    easter: {
        subjects: ["Easter Eggs", "Baskets", "Lambs", "Bunnies"],
        motifs: ["Painted Eggs", "Wicker Baskets", "Spring Flowers", "Grass Patches", "Ribbon Bows"]
    },
    summer: {
        subjects: ["Sunflowers", "Pineapples", "Beach Balls", "Ice Cream"],
        motifs: ["Sun Rays", "Tropical Leaves", "Seashells", "Watermelon Slices", "Beach Umbrellas"]
    },
    halloween: {
        subjects: ["Pumpkins", "Friendly Ghosts", "Candy Corn", "Black Cats"],
        motifs: ["Spider Webs", "Autumn Leaves", "Candy Treats", "Witch Hats", "Bats"]
    },
    wedding: {
        subjects: ["Wedding Rings", "Bouquets", "Wedding Cakes", "Lace Frames"],
        motifs: ["Pearl Strings", "Silk Ribbons", "Rose Petals", "Champagne Glasses", "Heart Confetti"]
    },
    birthday: {
        subjects: ["Layer Cakes", "Confetti", "Party Hats", "Balloons"],
        motifs: ["Streamers", "Gift Boxes", "Candles", "Stars", "Number Badges"]
    }
};

// Updated with new trendy palettes
export const colorPalettes = {
    sunsetSorbet: ['#FF6B6B', '#FFD166', '#4ECDC4', '#F7FFF7'],
    mintySage: ['#A8D8B9', '#F0EFEB', '#77AFA0', '#4A7C59'],
    cosmicDust: ['#3D315B', '#F9C80E', '#ED217C', '#9A1750'],
    bohoEarth: ['#D8A788', '#F3E5AB', '#BC4749', '#386641'],
};
