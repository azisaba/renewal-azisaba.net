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

export default defineCachedEventHandler(
  async (): Promise<Player[]> => {
    const config = useRuntimeConfig();

    const payments = await $fetch<Payment[]>("https://plugin.tebex.io/payments?limit=50", {
      headers: {
        "X-Tebex-Secret": config.tebexSecret,
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
    maxAge: 60 * 10,
  },
);
