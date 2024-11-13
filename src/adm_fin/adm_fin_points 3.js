function hasSufficientPoints(userPoints, productPointsCost) {
   return userPoints >= productPointsCost;
}

function redeemProduct(userPoints, productPointsCost, productCostToCompany) {
   if (!hasSufficientPoints(userPoints, productPointsCost)) {
       throw new Error('Pontos insuficientes para o resgate');
   }
   
   const updatedUserPoints = userPoints - productPointsCost;
   const companyCost = productCostToCompany;

   return {
       updatedUserPoints,
       companyCost
   };
}

module.exports = {
   hasSufficientPoints,
   redeemProduct
};
