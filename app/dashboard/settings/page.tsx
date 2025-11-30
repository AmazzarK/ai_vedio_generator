'use client'

import { User, Bell, Shield, CreditCard, Database, Share2, Crown, LogOut, Save } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'subscription', name: 'Subscription', icon: Crown },
    { id: 'tokens', name: 'Tokens & Credits', icon: CreditCard },
    { id: 'storage', name: 'Storage', icon: Database },
    { id: 'social', name: 'Connected Accounts', icon: Share2 },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-[#16161B] rounded-2xl border border-[#7C3AED]/20 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#7C3AED]/20 border border-[#7C3AED]/30 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-[#0F0F12]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-[#16161B] rounded-2xl border border-[#7C3AED]/20 p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Profile Picture</label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-linear-to-br from-[#7C3AED] to-[#00E7FF] rounded-full flex items-center justify-center text-2xl font-bold">
                        JD
                      </div>
                      <button className="px-4 py-2 bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 border border-[#7C3AED]/30 rounded-lg text-sm font-medium transition-colors">
                        Change Photo
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="John Doe"
                      className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      defaultValue="john.doe@example.com"
                      className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <input 
                      type="text" 
                      defaultValue="@johndoe"
                      className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea 
                      rows={4}
                      defaultValue="Content creator and video enthusiast"
                      className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20"
                    />
                  </div>

                  <button className="w-full py-3 bg-linear-to-r from-[#7C3AED] to-[#00E7FF] rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {[
                    { id: 'video-complete', label: 'Video Generation Complete', description: 'Get notified when your video is ready' },
                    { id: 'tokens-low', label: 'Low Token Balance', description: 'Alert when you have less than 50 tokens' },
                    { id: 'new-features', label: 'New Features', description: 'Updates about new tools and features' },
                    { id: 'tips', label: 'Tips & Tutorials', description: 'Helpful tips to improve your videos' },
                    { id: 'promotions', label: 'Promotions & Offers', description: 'Special deals and discounts' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-start justify-between p-4 bg-[#0F0F12] rounded-xl border border-[#7C3AED]/20">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{item.label}</h3>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7C3AED]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C3AED]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subscription Tab */}
            {activeTab === 'subscription' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Subscription Plan</h2>
                
                {/* Current Plan */}
                <div className="p-6 bg-[#0F0F12] rounded-xl border border-[#7C3AED]/30 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Free Plan</h3>
                      <p className="text-gray-400">Watch ads to earn tokens</p>
                    </div>
                    <div className="px-4 py-2 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-lg text-sm font-medium">
                      Current Plan
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>✓ 250 initial tokens</li>
                    <li>✓ 20 tokens per video</li>
                    <li>✓ Watch ads for +50 tokens</li>
                    <li>✓ Up to 1080p quality</li>
                    <li>✓ 10GB storage</li>
                  </ul>
                </div>

                {/* Pro Plan */}
                <div className="p-6 bg-linear-to-br from-[#FFD700]/10 to-[#FFA500]/10 rounded-xl border-2 border-[#FFD700]/30 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Crown className="w-5 h-5 text-[#FFD700]" />
                        <h3 className="text-xl font-semibold">Pro Plan</h3>
                      </div>
                      <p className="text-gray-400">Unlimited creativity without limits</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-[#FFD700]">$19</div>
                      <div className="text-sm text-gray-400">/month</div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm mb-6">
                    <li>✓ <strong>Unlimited tokens</strong></li>
                    <li>✓ No ads, ever</li>
                    <li>✓ Up to <strong>4K quality</strong></li>
                    <li>✓ <strong>100GB storage</strong></li>
                    <li>✓ Priority generation queue</li>
                    <li>✓ Advanced AI tools</li>
                    <li>✓ Commercial license</li>
                  </ul>
                  <button className="w-full py-3 bg-linear-to-r from-[#FFD700] to-[#FFA500] rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-black">
                    <Crown className="w-5 h-5" />
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            )}

            {/* Tokens Tab */}
            {activeTab === 'tokens' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Tokens & Credits</h2>
                
                {/* Current Balance */}
                <div className="p-6 bg-linear-to-br from-[#FFD700]/10 to-[#FFA500]/10 rounded-xl border border-[#FFD700]/30 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#FFD700] mb-2">250</div>
                    <p className="text-gray-400">Available Tokens</p>
                  </div>
                </div>

                {/* Token Packages */}
                <h3 className="font-semibold mb-4">Buy Token Packages</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { tokens: 500, price: 4.99, bonus: 0 },
                    { tokens: 1000, price: 8.99, bonus: 100, popular: true },
                    { tokens: 2500, price: 19.99, bonus: 500 },
                  ].map((pkg) => (
                    <div
                      key={pkg.tokens}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        pkg.popular
                          ? 'bg-[#7C3AED]/10 border-[#7C3AED]'
                          : 'bg-[#0F0F12] border-[#7C3AED]/20 hover:border-[#7C3AED]/50'
                      }`}
                    >
                      {pkg.popular && (
                        <div className="text-xs font-semibold text-[#00E7FF] mb-2">MOST POPULAR</div>
                      )}
                      <div className="text-2xl font-bold mb-1">{pkg.tokens} {pkg.bonus > 0 && `+${pkg.bonus}`}</div>
                      <div className="text-sm text-gray-400 mb-4">Tokens</div>
                      <div className="text-xl font-bold mb-4">${pkg.price}</div>
                      <button className="w-full py-2 bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 border border-[#7C3AED]/30 rounded-lg text-sm font-medium transition-colors">
                        Buy Now
                      </button>
                    </div>
                  ))}
                </div>

                {/* Transaction History */}
                <h3 className="font-semibold mb-4">Recent Transactions</h3>
                <div className="space-y-2">
                  {[
                    { type: 'earned', amount: 50, reason: 'Watched ad', date: '2 hours ago' },
                    { type: 'spent', amount: -20, reason: 'Video generation', date: '3 hours ago' },
                    { type: 'earned', amount: 250, reason: 'Initial bonus', date: '1 day ago' },
                  ].map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#0F0F12] rounded-xl">
                      <div>
                        <div className="font-medium">{tx.reason}</div>
                        <div className="text-sm text-gray-400">{tx.date}</div>
                      </div>
                      <div className={`text-lg font-semibold ${tx.type === 'earned' ? 'text-green-400' : 'text-red-400'}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Storage Tab */}
            {activeTab === 'storage' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Storage Management</h2>
                
                {/* Storage Usage */}
                <div className="p-6 bg-[#0F0F12] rounded-xl border border-[#7C3AED]/30 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Storage Usage</h3>
                    <span className="text-sm text-gray-400">2.4GB / 10GB</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                    <div className="bg-linear-to-r from-[#7C3AED] to-[#00E7FF] h-3 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                  <p className="text-sm text-gray-400">7.6GB remaining</p>
                </div>

                {/* Storage Breakdown */}
                <div className="space-y-3 mb-6">
                  {[
                    { type: 'Videos', size: '1.8GB', count: 12, color: '#7C3AED' },
                    { type: 'Thumbnails', size: '340MB', count: 12, color: '#00E7FF' },
                    { type: 'Drafts', size: '260MB', count: 5, color: '#FFD700' },
                  ].map((item) => (
                    <div key={item.type} className="flex items-center justify-between p-4 bg-[#0F0F12] rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <div>
                          <div className="font-medium">{item.type}</div>
                          <div className="text-sm text-gray-400">{item.count} items</div>
                        </div>
                      </div>
                      <div className="font-semibold">{item.size}</div>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl font-semibold transition-colors text-red-400">
                  Clear Cache & Temporary Files
                </button>
              </div>
            )}

            {/* Social Accounts Tab */}
            {activeTab === 'social' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Connected Accounts</h2>
                <p className="text-gray-400 mb-6">Connect your social media accounts to share videos directly</p>
                
                <div className="space-y-3">
                  {[
                    { platform: 'TikTok', icon: '📱', connected: true },
                    { platform: 'Instagram', icon: '📷', connected: true },
                    { platform: 'YouTube', icon: '▶️', connected: false },
                    { platform: 'Facebook', icon: '👥', connected: false },
                    { platform: 'Twitter', icon: '🐦', connected: false },
                    { platform: 'LinkedIn', icon: '💼', connected: false },
                  ].map((account) => (
                    <div key={account.platform} className="flex items-center justify-between p-4 bg-[#0F0F12] rounded-xl border border-[#7C3AED]/20">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{account.icon}</div>
                        <div className="font-medium">{account.platform}</div>
                      </div>
                      {account.connected ? (
                        <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-sm font-medium transition-colors text-red-400">
                          Disconnect
                        </button>
                      ) : (
                        <button className="px-4 py-2 bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 border border-[#7C3AED]/30 rounded-lg text-sm font-medium transition-colors">
                          Connect
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Privacy & Security</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Account Visibility</h3>
                    <div className="space-y-2">
                      {[
                        { label: 'Make profile public', description: 'Others can see your profile and videos' },
                        { label: 'Show video count', description: 'Display total videos created' },
                        { label: 'Allow downloads', description: 'Others can download your videos' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start justify-between p-4 bg-[#0F0F12] rounded-xl">
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{item.label}</h4>
                            <p className="text-sm text-gray-400">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7C3AED]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C3AED]"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Security</h3>
                    <div className="space-y-2">
                      <button className="w-full p-4 bg-[#0F0F12] rounded-xl text-left hover:bg-[#7C3AED]/10 transition-colors">
                        <div className="font-medium">Change Password</div>
                        <div className="text-sm text-gray-400">Update your password regularly</div>
                      </button>
                      <button className="w-full p-4 bg-[#0F0F12] rounded-xl text-left hover:bg-[#7C3AED]/10 transition-colors">
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-400">Add an extra layer of security</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-red-400">Danger Zone</h3>
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                      <button className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg font-semibold transition-colors text-red-400 flex items-center justify-center gap-2">
                        <LogOut className="w-5 h-5" />
                        Delete Account
                      </button>
                      <p className="text-sm text-gray-400 mt-3 text-center">This action cannot be undone</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
