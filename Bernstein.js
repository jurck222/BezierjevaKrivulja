export class Bernstein {
    constructor(n, k){
        this.n=n;
        this.k=k;
    }
    value(x){
        let ncr= 1;
        let top = 1;
        for(let i = this.n; i >= 1; i--){
           top = top * i;
          }
        let bot1 = 1;
        for(let i = this.k; i >= 1; i--){
            bot1 = bot1 * i;
           }
        let bot2= 1
        for(let i = this.n-this.k; i >= 1; i--){
            bot2 = bot2 * i;
           }
        ncr = top/(bot1*bot2);
        let z = this.n-this.k;
        return ncr*(x**this.k)*((1-x)**z);
    }
    derivative(x){
        let nB= new Bernstein(this.n-1,this.k-1);
        let nB2= new Bernstein(this.n-1,this.k);
        return this.n*(nB.value(x)-nB2.value(x));
    }
}

