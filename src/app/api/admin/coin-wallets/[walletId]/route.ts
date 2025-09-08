// src/app/api/admin/coin-wallets/[walletId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT - Update coin wallet balance
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ walletId: string }>}
) {
  const { walletId } = await params;
  try {
    const { balance } = await request.json();

    const coinWallet = await prisma.coinWallet.update({
      where: {
        id: walletId,
      },
      data: {
        balance: parseFloat(balance),
      },
    });

    return NextResponse.json(coinWallet);
  } catch (error) {
    console.error('Error updating coin wallet:', error);
    return NextResponse.json(
      { error: 'Failed to update coin wallet' },
      { status: 500 }
    );
  }
}

// DELETE - Delete coin wallet
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ walletId: string }> }
) {
  try {
    const { walletId } = await params;
    await prisma.coinWallet.delete({
      where: {
        id: walletId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting coin wallet:', error);
    return NextResponse.json(
      { error: 'Failed to delete coin wallet' },
      { status: 500 }
    );
  }
}