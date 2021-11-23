function 摇色子(猜测) {
    return new Promise((resolve, reject) => {
        let sino = parseInt(Math.random() * 6 + 1)
        if (sino > 3) {
            if (猜测 === '大') {
                resolve(sino)
            } else {
                reject(sino)
            }
        } else {
            if (猜测 === '大') {
                reject(sino)
            } else {
                resolve(sino)
            }
        }
        setTimeout(() => {
            resolve(sino)
        }, 300)
    })
}
async function test() {
    try {
        let n = await Promise.all([摇色子('大'), 摇色子('大')])
        console.log(n)
    } catch (error) {
        console.log(error)
    }
}
test()