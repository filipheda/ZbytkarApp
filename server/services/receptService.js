const Recept = require('../models/recept');
const Ingredience = require('../models/ingredience');

class ReceptService {
  // Pokrocile vyhledavani fulltext 
  async searchRecepty({ query, filtry, stranka = 1, limit = 10 }) {
    const aggregatePipeline = [];
    if (query) {
      aggregatePipeline.push({
        $match: {
          $text: { $search: query }
        }
      });
    }

    // Filtrace podle tags
    if (filtry?.tagy) {
      aggregatePipeline.push({
        $match: {
          tagy: { $all: filtry.tagy }
        }
      });
    }

    // Paginace
    aggregatePipeline.push(
      { $skip: (stranka - 1) * limit },
      { $limit: limit },
      {
        $lookup: {
          from: 'ingredience',
          localField: 'potrebneIngredienty.ingredienceId',
          foreignField: '_id',
          as: 'potrebneIngredience'
        }
      },
      {
        $project: {
          nazev: 1,
          dobaVypravy: 1,
          obtiznost: 1,
          'potrebneIngredience.nazev': 1,
          skoreRelevance: { $meta: 'textScore' }
        }
      },
      { $sort: { skoreRelevance: -1 } }
    );

    return Recept.aggregate(aggregatePipeline);
  }

  // generovani sezmanu nakupniho
  async generujNakupniSeznam(chybejiciIngredience) {
    const seznam = await Ingredience.find({
      _id: { $in: chybejiciIngredience.map(i => i.ingredienceId) }
    }).lean();

    return seznam.map(ingredience => ({
      ...ingredience,
      potrebneMnozstvi: chybejiciIngredience.find(i => 
        i.ingredienceId.equals(ingredience._id)
      ).mnozstvi
    }));
  }

  // fav recept fun.
  async aktualizujOblibenost(receptId) {
    return Recept.findByIdAndUpdate(
      receptId,
      { $inc: { pocetZobrazeni: 1 } },
      { new: true }
    );
  }

  // val dostupnosti ingre ve spajzu
  async checkDostupnost(receptId, userId) {
    const [recept, spiz] = await Promise.all([
      Recept.findById(receptId)
        .populate('potrebneIngredienty.ingredienceId'),
      mongoose.model('SpizUzivatele').findOne({ userId })
    ]);

    return recept.potrebneIngredienty.map(ingredience => {
      const vSpizi = spiz.ingredience.find(i => 
        i.ingredienceId.equals(ingredience.ingredienceId._id)
      );
      return {
        ...ingredience.toObject(),
        dostupne: vSpizi ? vSpizi.mnozstvi : 0,
        dostatecne: vSpizi?.mnozstvi >= ingredience.mnozstvi
      };
    });
  }
}

module.exports = new ReceptService();
