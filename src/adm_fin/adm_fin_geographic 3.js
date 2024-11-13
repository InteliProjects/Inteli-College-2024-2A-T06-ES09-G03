
function isGeographicalReachAcceptable(geographicalReach, threshold) {
   return geographicalReach >= threshold;
}


function assessPointRedemptionEffectiveness(regionData) {
   return regionData.map(region => {
       const redemptionRate = (region.pointsRedeemed / region.pointsAvailable) * 100;
       return {
           regionName: region.name,
           redemptionRate,
           isEffective: redemptionRate >= region.targetRate
       };
   });
}


module.exports = {
   isGeographicalReachAcceptable,
   assessPointRedemptionEffectiveness
};
