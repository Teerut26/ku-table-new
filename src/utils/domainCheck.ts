const domainCanAcess =  [
    "localhost:3000",
    "localhost:3001",
    "kugetreg.teerut.com"
]

const domainCheck = (domain:string) => {
    return domainCanAcess.includes(domain)
}

export default domainCheck
