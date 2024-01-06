const domainCanAcess =  [
    "localhost:3000",
    "kugetreg.teerut.me"
]

const domainCheck = (domain:string) => {
    return domainCanAcess.includes(domain)
}

export default domainCheck