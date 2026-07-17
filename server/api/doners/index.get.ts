type Payment = {
  amount: string;
  status: "Complete" | "Chargeback" | "Refund";
  player: {
    id: number;
    name: string;
    uuid: string;
  };
};

type Player = Payment["player"];

const TEBEX_SECRET = useRuntimeConfig().tebexSecret;
const LIMIT = 50;

export default defineCachedEventHandler(
  async (): Promise<Player[]> => {
    const payments = await $fetch<Payment[]>(`https://plugin.tebex.io/payments?limit=${LIMIT}`, {
      headers: {
        "X-Tebex-Secret": TEBEX_SECRET,
      },
    });

    return [
      ...payments
        .filter((payment) => payment.status === "Complete")
        .reduce<Map<string, Player & { totalAmount: number }>>((map, payment) => {
          const key = payment.player.uuid;
          const current = map.get(key);

          map.set(key, {
            ...payment.player,
            totalAmount: (current?.totalAmount ?? 0) + Number.parseFloat(payment.amount),
          });

          return map;
        }, new Map())
        .values(),
    ]
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .map(({ totalAmount: _totalAmount, ...player }) => player);
  },
  {
    maxAge: 60 * 15,
  },
);
