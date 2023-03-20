function angleToRad(angle) {
    return angle*Math.PI/180
}
export function calculateHeadWind(windDegree, windSpeed, runwayHeading ) {
    if (!windDegree) return null
    const angle = Math.abs(windDegree - runwayHeading)
    let headWind = windSpeed*Math.cos(angleToRad(angle))
    return Math.round(headWind)
}
export function calculateCrossWind(windDegree, windSpeed, runwayHeading ) {
    if (!windDegree) return null
    const angle = Math.abs(windDegree - runwayHeading)
    let crossWind = windSpeed*Math.sin(angleToRad(angle))
    return Math.round(Math.abs(crossWind))
}