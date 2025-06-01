const Recept = require('../models/recept');
const Ingredience = require('../models/ingredience');

class RecommendationService {me
  // gen podle spajzu
  async generateReceptyProIngredienty(dostupneIngredienty) {
    try {
      const recepty = await Recept.find()
        .populate('potrebneIngredienty.ingredienceId')
        .populate('volitelneIngredienty.ingredienceId')
        .populate('tagy');

      const doporuceneRecepty = [];

      for (const recept of recepty) {
        const hodnoceni = this.hodnotRecept(recept, dostupneIngredienty);
        if (hodnoceni.moznyRecept) {
          doporuceneRecepty.push({
            ...recept.toObject(),
            hodnoceni
          });
        }
      }

      // sort podle % ingr rec a fav
      doporuceneRecepty.sort((a, b) => {
        if (a.hodnoceni.procentoUplnosti !== b.hodnoceni.procentoUplnosti) {
          return b.hodnoceni.procentoUplnosti - a.hodnoceni.procentoUplnosti;
        }
        return a.hodnoceni.chybejiciIngredienty.length - b.hodnoceni.chybejiciIngredienty.length;
      });

      return doporuceneRecepty.slice(0, 20);
    } catch (error) {
      throw new Error(`Chyba při generování doporučení: ${error.message}`);
    }
  }

  // rat receptu podle ingr
  hodnotRecept(recept, dostupneIngredienty) {
    const potrebneIds = recept.potrebneIngredienty.map(i => i.ingredienceId._id.toString());
    const dostupneIds = dostupneIngredienty.map(i => i.ingredienceId);
    
    const dostupnePotrebne = potrebneIds.filter(id => dostupneIds.includes(id));
    const chybejiciIngredienty = recept.potrebneIngredienty.filter(
      i => !dostupneIds.includes(i.ingredienceId._id.toString())
    );

    const procentoUplnosti = (dostupnePotrebne.length / potrebneIds.length) * 100;
    const moznyRecept = procentoUplnosti >= 70; // alepson 70% ingrediencí

    return {
      moznyRecept,
      procentoUplnosti: Math.round(procentoUplnosti),
      dostupneIngredienty: dostupnePotrebne.length,
      celkemPotrebnych: potrebneIds.length,
      chybejiciIngredienty: chybejiciIngredienty.map(i => ({
        ingredienceId: i.ingredienceId._id,
        nazev: i.ingredienceId.nazev,
        mnozstvi: i.mnozstvi,
        jednotka: i.jednotka
      }))
    };
  }

  // alt ingr search
  async najdiAlternativy(ingredienceId) {
    try {
      const ingredience = await Ingredience.findById(ingredienceId)
        .populate('alternativniIngredienty');
      
      return ingredience?.alternativniIngredienty || [];
    } catch (error) {
      return [];
    }
  }
}

module.exports = new RecommendationService();
