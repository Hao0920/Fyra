import { db } from './db';

const CACHE_TTL = 24 * 60 * 60 * 1000;

export async function getExchangeRate(from: string, to: string): Promise<number> {
  if (from === to) return 1;

  const cached = await db.exchangeRates.get(from);
  if (cached && cached.rates[to] && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.rates[to];
  }

  try {
    const res = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`);
    if (!res.ok) throw new Error('Rate fetch failed');
    const data = await res.json();
    const rate = data.rates[to];

    await db.exchangeRates.put({
      base: from,
      rates: { ...cached?.rates, [to]: rate },
      timestamp: Date.now(),
    });

    return rate;
  } catch {
    return cached?.rates[to] || 1;
  }
}

export async function convertCurrency(amount: number, from: string, to: string): Promise<number> {
  const rate = await getExchangeRate(from, to);
  return Math.round(amount * rate * 100) / 100;
}

export const COMMON_CURRENCIES = [
  { code: 'CNY', name: '人民币', symbol: '¥' },
  { code: 'USD', name: '美元', symbol: '$' },
  { code: 'EUR', name: '欧元', symbol: '€' },
  { code: 'JPY', name: '日元', symbol: '¥' },
  { code: 'HKD', name: '港币', symbol: '$' },
  { code: 'TWD', name: '新台币', symbol: 'NT$' },
  { code: 'GBP', name: '英镑', symbol: '£' },
  { code: 'KRW', name: '韩元', symbol: '₩' },
  { code: 'SGD', name: '新加坡元', symbol: '$' },
  { code: 'AUD', name: '澳元', symbol: '$' },
];
