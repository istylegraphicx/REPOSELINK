import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  dateOfDeath?: string;
  serviceType: 'traditional' | 'cremation' | 'memorial' | 'burial';
  serviceDate?: string;
  serviceTime?: string;
  status: 'consultation' | 'planning' | 'scheduled' | 'completed' | 'cancelled';
  totalAmount: number;
  paidAmount: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Payment {
  id: string;
  clientId: string;
  amount: number;
  method: 'cash' | 'card' | 'eft' | 'paypal';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  reference: string;
  createdAt: string;
  userId: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  userId: string;
}

export interface RealtimeState {
  clients: Client[];
  payments: Payment[];
  notifications: Notification[];
  isOnline: boolean;
  lastSync: string;
  
  // Client operations
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClient: (id: string) => Client | undefined;
  
  // Payment operations
  addPayment: (payment: Omit<Payment, 'id' | 'createdAt'>) => void;
  updatePayment: (id: string, updates: Partial<Payment>) => void;
  getClientPayments: (clientId: string) => Payment[];
  
  // Notification operations
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  getUnreadCount: () => number;
  
  // Real-time sync
  syncData: () => Promise<void>;
  initialize: (userId: string) => void;
}

// Mock data generator
const generateMockClients = (userId: string): Client[] => [
  {
    id: '1',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+27 11 234 5678',
    address: '123 Oak Street, Johannesburg',
    dateOfBirth: '1965-03-15',
    dateOfDeath: '2024-01-10',
    serviceType: 'traditional',
    serviceDate: '2024-01-20',
    serviceTime: '10:00',
    status: 'scheduled',
    totalAmount: 8500,
    paidAmount: 5000,
    notes: 'Family prefers morning service. Special music requests.',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    userId
  },
  {
    id: '2',
    fullName: 'Michael Smith',
    email: 'michael.smith@email.com',
    phone: '+27 21 345 6789',
    address: '456 Pine Avenue, Cape Town',
    dateOfBirth: '1978-07-22',
    dateOfDeath: '2024-01-08',
    serviceType: 'cremation',
    serviceDate: '2024-01-22',
    serviceTime: '14:00',
    status: 'completed',
    totalAmount: 5200,
    paidAmount: 5200,
    notes: 'Cremation completed. Ashes collected by family.',
    createdAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-22T16:00:00Z',
    userId
  },
  {
    id: '3',
    fullName: 'Emma Davis',
    email: 'emma.davis@email.com',
    phone: '+27 31 456 7890',
    address: '789 Maple Road, Durban',
    dateOfBirth: '1955-11-08',
    dateOfDeath: '2024-01-05',
    serviceType: 'memorial',
    serviceDate: '2024-01-25',
    serviceTime: '11:00',
    status: 'planning',
    totalAmount: 3800,
    paidAmount: 1000,
    notes: 'Memorial service only. Family organizing venue.',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-10T09:15:00Z',
    userId
  }
];

const generateMockPayments = (userId: string): Payment[] => [
  {
    id: '1',
    clientId: '1',
    amount: 3000,
    method: 'eft',
    status: 'completed',
    reference: 'EFT-001-2024',
    createdAt: '2024-01-15T12:00:00Z',
    userId
  },
  {
    id: '2',
    clientId: '1',
    amount: 2000,
    method: 'card',
    status: 'completed',
    reference: 'CARD-002-2024',
    createdAt: '2024-01-18T10:30:00Z',
    userId
  },
  {
    id: '3',
    clientId: '2',
    amount: 5200,
    method: 'paypal',
    status: 'completed',
    reference: 'PP-003-2024',
    createdAt: '2024-01-12T16:45:00Z',
    userId
  },
  {
    id: '4',
    clientId: '3',
    amount: 1000,
    method: 'cash',
    status: 'completed',
    reference: 'CASH-004-2024',
    createdAt: '2024-01-10T11:20:00Z',
    userId
  }
];

export const useRealtime = create<RealtimeState>()(
  subscribeWithSelector((set, get) => ({
    clients: [],
    payments: [],
    notifications: [],
    isOnline: navigator.onLine,
    lastSync: new Date().toISOString(),

    addClient: (clientData) => {
      const newClient: Client = {
        ...clientData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      set(state => ({
        clients: [...state.clients, newClient],
        lastSync: new Date().toISOString()
      }));
      
      // Add notification
      get().addNotification({
        title: 'New Client Added',
        message: `${newClient.fullName} has been added to your clients.`,
        type: 'success',
        read: false,
        userId: newClient.userId
      });
    },

    updateClient: (id, updates) => {
      set(state => ({
        clients: state.clients.map(client =>
          client.id === id
            ? { ...client, ...updates, updatedAt: new Date().toISOString() }
            : client
        ),
        lastSync: new Date().toISOString()
      }));
    },

    deleteClient: (id) => {
      const client = get().clients.find(c => c.id === id);
      set(state => ({
        clients: state.clients.filter(c => c.id !== id),
        payments: state.payments.filter(p => p.clientId !== id),
        lastSync: new Date().toISOString()
      }));
      
      if (client) {
        get().addNotification({
          title: 'Client Removed',
          message: `${client.fullName} has been removed from your clients.`,
          type: 'info',
          read: false,
          userId: client.userId
        });
      }
    },

    getClient: (id) => {
      return get().clients.find(client => client.id === id);
    },

    addPayment: (paymentData) => {
      const newPayment: Payment = {
        ...paymentData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };
      
      set(state => ({
        payments: [...state.payments, newPayment],
        lastSync: new Date().toISOString()
      }));

      const client = get().getClient(newPayment.clientId);
      if (client) {
        get().addNotification({
          title: 'Payment Received',
          message: `Payment of R${newPayment.amount} received from ${client.fullName}.`,
          type: 'success',
          read: false,
          userId: newPayment.userId
        });
      }
    },

    updatePayment: (id, updates) => {
      set(state => ({
        payments: state.payments.map(payment =>
          payment.id === id ? { ...payment, ...updates } : payment
        ),
        lastSync: new Date().toISOString()
      }));
    },

    getClientPayments: (clientId) => {
      return get().payments.filter(payment => payment.clientId === clientId);
    },

    addNotification: (notificationData) => {
      const newNotification: Notification = {
        ...notificationData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };
      
      set(state => ({
        notifications: [newNotification, ...state.notifications].slice(0, 50) // Keep only latest 50
      }));
    },

    markNotificationRead: (id) => {
      set(state => ({
        notifications: state.notifications.map(notif =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      }));
    },

    clearNotifications: () => {
      set({ notifications: [] });
    },

    getUnreadCount: () => {
      return get().notifications.filter(n => !n.read).length;
    },

    syncData: async () => {
      set({ isOnline: navigator.onLine });
      
      // Simulate real-time sync
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ lastSync: new Date().toISOString() });
    },

    initialize: (userId) => {
      // Initialize with mock data
      set({
        clients: generateMockClients(userId),
        payments: generateMockPayments(userId),
        notifications: [
          {
            id: '1',
            title: 'Welcome to ReposeLink',
            message: 'Your dashboard is ready. Start managing your funeral home operations.',
            type: 'info',
            read: false,
            createdAt: new Date().toISOString(),
            userId
          }
        ]
      });
    }
  }))
);

// Auto-sync every 30 seconds
setInterval(() => {
  useRealtime.getState().syncData();
}, 30000);

// Listen for online/offline events
window.addEventListener('online', () => {
  useRealtime.setState({ isOnline: true });
});

window.addEventListener('offline', () => {
  useRealtime.setState({ isOnline: false });
});