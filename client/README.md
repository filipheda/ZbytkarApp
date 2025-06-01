# Zbytkář - PWA Aplikace

Progressive Web App pro snížení plýtvání potravinami pomocí generování receptů z dostupných ingrediencí.

## 🎯 Funkcionalita

### Klíčové vlastnosti
- **Generování receptů** z dostupných ingrediencí
- **Interaktivní průvodce vařením** s časovači
- **Správa spíže** s CRUD operacemi
- **Nákupní seznam** pro chybějící ingredience
- **Filtrování receptů** podle tagů
- **Responzivní design** (Mobile-first PWA)

### Route List
1. **`/` (Home)** - Generátor receptů s ingredient selectorem
2. **`/recipe/:id`** - Detail receptu s dostupnými/chybějícími ingrediencemi
3. **`/cooking/:id`** - Interaktivní vaření s kroky a progress barem
4. **`/pantry`** - Správa spíže s CRUD operacemi
5. **`/recipes`** - Filtrování receptů podle tagů
6. **`/shopping`** - Nákupní seznam s chybějícími ingrediencemi

## 🚀 Spuštění projektu

### Předpoklady
- Node.js 16+
- npm nebo yarn

### Instalace
```bash
# Klonování repository
git clone https://github.com/filipheda/project.git
cd project

# Instalace závislostí
npm install

# Spuštění dev serveru
npm start
```

Aplikace poběží na `http://localhost:3000`

### Build pro produkci
```bash
npm run build
```

## 📱 Technologie

- **React 18** - UI framework
- **JavaScript** - Hlavní programovací jazyk
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Ikony
- **Create React App** - Build nástroj

## 🎨 Design System

### Barvy
- **Primary**: Green (#16a34a)
- **Secondary**: Blue (#3b82f6)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Komponenty
- **Header** - Navigační hlavička
- **BottomNav** - Mobilní spodní navigace
- **RecipeCard** - Karta receptu
- **IngredientList** - Seznam ingrediencí

## 📦 Struktura projektu

```
src/
├── components/          # Znovupoužitelné komponenty
│   ├── Header.js       # Navigační hlavička
│   ├── BottomNav.js    # Mobilní navigace
│   ├── RecipeCard.js   # Karta receptu
│   └── IngredientList.js # Seznam ingrediencí
├── pages/              # Stránky aplikace
│   ├── Home.js         # Hlavní generátor
│   ├── RecipeDetail.js # Detail receptu
│   ├── CookingMode.js  # Interaktivní vaření
│   ├── PantryManagement.js # Správa spíže
│   ├── RecipeFiltering.js # Filtrování receptů
│   └── ShoppingList.js # Nákupní seznam
├── utils/              # Pomocné funkce
│   └── mockData.js     # Mock data
├── App.js              # Hlavní aplikace
├── index.js            # Entry point
└── index.css           # Globální styly
```

## 🔧 Vývoj

### Přidání nové stránky
1. Vytvoř nový soubor v `src/pages/`
2. Exportuj komponentu v `src/pages/index.js`
3. Přidej route do `App.js`

### Přidání nového komponentu
1. Vytvoř nový soubor v `src/components/`
2. Exportuj komponentu v `src/components/index.js`

### Mock Data
Všechna testovací data jsou v `src/utils/mockData.js`

## 📋 Business Cases

### Implementované podle dokumentace:

1. **✅ Generování receptů z dostupných ingrediencí**
   - Uživatel vybere dostupné ingredience
   - Systém vygeneruje recepty s % match
   - Zobrazení dostupných vs. chybějících ingrediencí

2. **✅ Přidání chybějících ingrediencí na nákupní seznam**
   - Detail receptu ukazuje co chybí
   - Tlačítko pro přidání na nákupní seznam
   - Automatické přidání missing ingrediencí

3. **✅ Interaktivní průvodce vařením**
   - Step-by-step kroky s progress barem
   - Integrované časovače pro každý krok
   - Tipy a potřebné ingredience

4. **✅ Filtrování receptů podle tagů**
   - Aktivní filtry s možností odstranění
   - Kategorie tagů (jídlo, dieta, čas)
   - Vyhledávání podle názvu

5. **✅ Aktualizace spíže uživatele**
   - CRUD operace s ingrediencemi
   - Kategorizace a vyhledávání
   - Doporučený nákup

## 🌟 PWA vlastnosti

- **Responzivní design** - Mobile-first přístup
- **Touch-friendly** - Optimalizováno pro dotyková zařízení
- **Offline-ready struktura** - Připraveno pro service worker
- **App-like navigation** - Nativní feel

## 📝 Licence

MIT License

## 👥 Autoři

- Filip Heda - Hlavní vývojář

---

**Zbytkář** - Méně plýtvání, více kreativního vaření! 🍳✨