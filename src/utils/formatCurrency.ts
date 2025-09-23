export function formatCurrency(value: string | number) {
    let cleaned = value;

    if(typeof value == "string"){
        cleaned = (cleaned as string).replace(/\D/g,'')
    }
    
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(
        Number(cleaned)/100
    );
}