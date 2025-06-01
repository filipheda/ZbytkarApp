export const mockData = {
  availableIngredients: [
    { id: 'rajcata', name: 'Rajčata', checked: true },
    { id: 'cibule', name: 'Cibule', checked: true },
    { id: 'cesnek', name: 'Česnek', checked: true },
    { id: 'testoviny', name: 'Těstoviny', checked: true },
    { id: 'olivovy-olej', name: 'Olivový olej', checked: true },
    { id: 'syr', name: 'Sýr', checked: false },
    { id: 'bazalka', name: 'Bazalka', checked: false },
    { id: 'mlete-maso', name: 'Mleté maso', checked: false },
    { id: 'paprika', name: 'Paprika', checked: false },
    { id: 'houby', name: 'Houby', checked: false },
    { id: 'mrkev', name: 'Mrkev', checked: false },
    { id: 'brambory', name: 'Brambory', checked: false }
  ],

  generatedRecipes: [
    {
      id: 1,
      name: 'Těstovinový salát',
      description: 'Jednoduchý těstovinový salát s rajčaty a cibulí.',
      time: 25,
      difficulty: 'Snadná',
      match: 80,
      missingIngredients: ['Sýr (100g)', 'Bazalka (1 svazek)'],
      tags: ['Rychlé', 'Vegetariánské'],
   instructions: [
  {
    text: 'Přiveďte velký hrnec vody k varu. Přidejte sůl a těstoviny.',
    time: 600 // čas v sekundách
  },
  {
    text: 'Vařte podle návodu na obalu, dokud nebudou al dente (obvykle 8-10 minut).',
    time: 480
  },
  // ...
]
    },
    {
      id: 2,
      name: 'Rajčatová omáčka',
      description: 'Domácí rajčatová omáčka s česnekem.',
      time: 40,
      difficulty: 'Střední',
      match: 100,
      missingIngredients: [],
      tags: ['Vegan', 'Bez lepku'],
      instructions: [
        'Nakrájejte cibuli na kostičky a česnek najemno.',
        'Rozehřejte olivový olej na pánvi a osmažte cibuli.',
        'Přidejte česnek a rajčata, vařte 20 minut.',
        'Dochuťte solí a pepřem.'
        
      ]
    },
    {
      id: 3,
      name: 'Marinovaná zelenina',
      description: 'Rychlá marinovaná zelenina s olivovým olejem.',
      time: 15,
      difficulty: 'Snadná',
      match: 90,
      missingIngredients: ['Ocet (2 lžíce)'],
      tags: ['Vegan', 'Rychlé'],
      instructions: [
        'Nakrájejte zeleninu na tenké plátky.',
        'Smíchejte olivový olej s octem.',
        'Zalijte zeleninu marinádou a nechte odležet.',
        'Podávejte chladné.'
      ]
    }
  ],

  allRecipes: [
    {
      id: 4,
      name: 'Veganské smoothie',
      description: 'Zdravé ranní smoothie s ovocem',
      time: 10,
      difficulty: 'Snadná',
      tags: ['Snídaně', 'Vegan', 'Rychlé']
    },
    {
      id: 5,
      name: 'Ovesná kaše s ovocem',
      description: 'Výživná snídaně plná energie',
      time: 15,
      difficulty: 'Snadná',
      tags: ['Snídaně', 'Vegetariánské', 'Zdravé']
    },
    {
      id: 6,
      name: 'Grilovaná zelenina',
      description: 'Lehká a chutná grilovaná zelenina',
      time: 30,
      difficulty: 'Střední',
      tags: ['Vegan', 'Grilování', 'Zdravé']
    },
    {
      id: 7,
      name: 'Česnekové brambory',
      description: 'Pečené brambory s česnekem a bylinkami',
      time: 45,
      difficulty: 'Snadná',
      tags: ['Vegetariánské', 'Pečení']
    },
    {
      id: 8,
      name: 'Houbová polévka',
      description: 'Krémová polévka z čerstvých hub',
      time: 35,
      difficulty: 'Střední',
      tags: ['Polévky', 'Vegetariánské', 'Comfort food']
    },
    {
      id: 9,
      name: 'Salát s mozzarellou',
      description: 'Čerstvý salát s mozzarellou a rajčaty',
      time: 10,
      difficulty: 'Snadná',
      tags: ['Rychlé', 'Vegetariánské', 'Lehké']
    }
  ],

  pantryItems: [
    { id: 'rajcata', name: 'Rajčata', amount: 3, unit: 'ks', category: 'Zelenina' },
    { id: 'cibule', name: 'Cibule', amount: 2, unit: 'ks', category: 'Zelenina' },
    { id: 'cesnek', name: 'Česnek', amount: 5, unit: 'stroužků', category: 'Zelenina' },
    { id: 'testoviny', name: 'Těstoviny', amount: 500, unit: 'g', category: 'Trvanlivé' },
    { id: 'olivovy-olej', name: 'Olivový olej', amount: 250, unit: 'ml', category: 'Trvanlivé' }
  ],

  shoppingList: ['Sýr (100g)', 'Bazalka (1 svazek)'],

  categories: ['Vše', 'Zelenina', 'Trvanlivé', 'Mléčné výrobky', 'Maso'],

  tags: [
    { name: 'Snídaně', type: 'meal' },
    { name: 'Oběd', type: 'meal' },
    { name: 'Večeře', type: 'meal' },
    { name: 'Vegan', type: 'diet' },
    { name: 'Vegetariánské', type: 'diet' },
    { name: 'Bez lepku', type: 'diet' },
    { name: 'Rychlé', type: 'time' },
    { name: 'Zdravé', type: 'style' },
    { name: 'Comfort food', type: 'style' }
  ]
};