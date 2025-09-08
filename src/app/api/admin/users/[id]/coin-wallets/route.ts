// src/app/api/admin/users/[id]/coin-wallets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Get user's coin wallets
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{id : string}> }
) {
  const userId = (await params).id;
  try {
    const coinWallets = await prisma.coinWallet.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(coinWallets);
  } catch (error) {
    console.error('Error fetching coin wallets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coin wallets' },
      { status: 500 }
    );
  }
}

// POST - Create new coin wallet
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{id : string}> }
) {
  const userId = (await params).id;
  try {
    const { geckoId, coinName, symbol, balance } = await request.json();

    // Check if wallet already exists for this coin
    const existingWallet = await prisma.coinWallet.findUnique({
      where: {
        userId_geckoId: {
          userId: userId,
          geckoId,
        },
      },
    });

    if (existingWallet) {
      return NextResponse.json(
        { error: 'Coin wallet already exists for this user' },
        { status: 400 }
      );
    }

    const coinWallet = await prisma.coinWallet.create({
      data: {
        userId: userId,
        geckoId,
        coinName,
        symbol,
        balance: parseFloat(balance),
      },
    });

    return NextResponse.json(coinWallet);
  } catch (error) {
    console.error('Error creating coin wallet:', error);
    return NextResponse.json(
      { error: 'Failed to create coin wallet' },
      { status: 500 }
    );
  }
}