export const generatePoints = () =>{
    let pointsArray: number[][] = []
    for (let i = 0; i < 50; i++){
        pointsArray.push([
            Math.floor(Math.floor(Math.random() * 500)),
            Math.floor(Math.floor(Math.random() * 500))
        ])
    }
    return pointsArray;
}