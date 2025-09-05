// app/api/admin/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

interface AdminPayload {
  adminId: string;
  email: string;
}

function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as AdminPayload;
    return payload;
  } catch (error) {
    console.log('JWT verification failed:', error);
    return null;
  }
}

function getAdminFromRequest(request: NextRequest): AdminPayload | null {
  const token = request.cookies.get('admin-token')?.value;
  if (!token) return null;
  
  return verifyAdminToken(token);
}

// PATCH - Update user balance
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('PATCH request for user ID:', id);

    // Verify admin authentication
    const admin = getAdminFromRequest(request);
    
    if (!admin) {
      console.log('Unauthorized admin access attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Admin authenticated:', admin.email);

    // Parse request body
    const body = await request.json();
    const { balance } = body;

    console.log('Update balance request:', { userId: id, balance });

    // Validate balance
    if (balance === undefined || balance === null) {
      return NextResponse.json(
        { error: 'Balance is required' },
        { status: 400 }
      );
    }

    const numericBalance = parseFloat(balance);
    if (isNaN(numericBalance)) {
      return NextResponse.json(
        { error: 'Balance must be a valid number' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('Updating user balance from', existingUser.balance, 'to', numericBalance);

    // Update user balance
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { balance: numericBalance }
    });

    console.log('User balance updated successfully');

    return NextResponse.json({
      message: 'User balance updated successfully',
      user: updatedUser
    });

  } catch (error: unknown) {
    console.error('Error updating user balance:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('DELETE request for user ID:', id);
    
    // Verify admin authentication
    const admin = getAdminFromRequest(request);
    
    if (!admin) {
      console.log('Unauthorized admin access attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Admin authenticated:', admin.email);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user is already deleted
    if (existingUser.isDeleted) {
      return NextResponse.json(
        { error: 'User is already deleted' },
        { status: 400 }
      );
    }

    // Prevent deleting admin users
    if (existingUser.isAdmin) {
      return NextResponse.json(
        { error: 'Cannot delete admin users' },
        { status: 403 }
      );
    }

    console.log('Soft deleting user:', existingUser.email);

    // Soft delete user
    const deletedUser = await prisma.user.update({
      where: { id: id },
      data: { 
        isDeleted: true,
        deletedAt: new Date()
      }
    });

    console.log('User soft deleted successfully');

    return NextResponse.json({
      message: 'User deleted successfully',
      user: deletedUser
    });

  } catch (error: unknown) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    );
  }
}

// GET - Get specific user details (optional)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('GET request for user ID:', params.id);
    
    // Verify admin authentication
    const admin = getAdminFromRequest(request);
    
    if (!admin) {
      console.log('Unauthorized admin access attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Admin authenticated:', admin.email);

    // Get user details
    const user = await prisma.user.findUnique({
      where: { id: params.id }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user
    });

  } catch (error: unknown) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    );
  }
}