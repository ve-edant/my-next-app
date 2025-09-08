// src/app/admin/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  imageUrl?: string | null;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  _count: {
    coinWallets: number;
  };
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (userId: string) => {
    router.push(`/admin/users/${userId}`);
  };

  if (loading) {
    return (
      <div className="max-w-lg mx-auto min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              Admin Dashboard
            </h1>
            <button
              onClick={() => {
                fetch("/api/admin/logout", { method: "POST" });
                router.push("/admin/login");
              }}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="px-4 py-4">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Users ({users.length})
          </h2>
          <p className="text-sm text-gray-600">
            Click on a user to manage their coin wallets
          </p>
        </div>

        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 overflow-hidden">
                      {user.imageUrl ? (
                        <img
                          className="h-full w-full object-cover"
                          src={user.imageUrl}
                          alt={user.firstName || user.email || "User"}
                        />
                      ) : (
                        <span className="text-blue-600 font-medium text-sm">
                          {user.firstName && user.firstName.length > 0
                            ? user.firstName[0].toUpperCase()
                            : user.email && user.email.length > 0
                            ? user.email[0].toUpperCase()
                            : "U"}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900">
                        {user.firstName || user.lastName
                          ? `${user.firstName || ""} ${
                              user.lastName || ""
                            }`.trim()
                          : user.email}
                      </h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    {user._count.coinWallets}{" "}
                    {user._count.coinWallets === 1 ? "Coin" : "Coins"}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center text-blue-600">
                    <span>Manage</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}
