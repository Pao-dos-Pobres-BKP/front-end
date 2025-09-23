export function formatCurrency(value: string) {
    const cleaned = value
    .replace(/\D/g,'');
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(
        Number(cleaned)/100
    );
}