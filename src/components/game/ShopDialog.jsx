import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Lock, Check, Zap, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { DETECTOR_TIERS, SHOVEL_TIERS } from './gameLogic';

export default function ShopDialog({ open, onClose, coins, playerLevel, currentDetector, currentShovel, onBuyDetector, onBuyShovel }) {
  const [activeTab, setActiveTab] = useState('detectors');

  const canAfford = (item) => coins >= item.price;
  const canUnlock = (item) => playerLevel >= item.requiredLevel;
  const isOwnedDetector = (detector) => detector.id <= currentDetector.id;
  const isOwnedShovel = (shovel) => shovel.id <= currentShovel.id;

  const renderDetectorCard = (detector, index) => {
    const affordable = canAfford(detector);
    const unlocked = canUnlock(detector);
    const owned = isOwnedDetector(detector);
    const isCurrent = detector.id === currentDetector.id;
    const canBuy = affordable && unlocked && !owned;

    return (
      <motion.div
        key={detector.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className={`border-2 transition-all ${
          isCurrent ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50' :
          owned ? 'border-gray-300 bg-gray-50' :
          canBuy ? 'border-purple-400 bg-gradient-to-r from-purple-50 to-indigo-50 hover:shadow-lg' :
          'border-gray-300 bg-gray-50 opacity-60'
        }`}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{detector.icon}</div>
                <div>
                  <CardTitle className="text-lg">{detector.name}</CardTitle>
                  <Badge className={`mt-1 bg-gradient-to-r ${detector.color} text-white capitalize`}>
                    {detector.tier}
                  </Badge>
                </div>
              </div>
              {isCurrent && (
                <Badge className="bg-green-600 text-white">
                  <Check className="w-3 h-3 mr-1" />
                  Equipped
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-lg p-3 border">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Zap className="w-4 h-4" />
                    Detection Bonus
                  </div>
                  <div className="text-xl font-bold text-gray-900">+{detector.detectionBonus}%</div>
                </div>
                <div className="bg-white/60 rounded-lg p-3 border">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    Required Level
                  </div>
                  <div className={`text-xl font-bold ${unlocked ? 'text-green-600' : 'text-red-600'}`}>
                    Level {detector.requiredLevel}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">Can Detect:</div>
                <div className="flex flex-wrap gap-2">
                  {detector.detectableRarities.map(rarity => (
                    <Badge key={rarity} variant="outline" className={`
                      ${rarity === 'common' ? 'border-slate-400 text-slate-700' : ''}
                      ${rarity === 'uncommon' ? 'border-green-500 text-green-700' : ''}
                      ${rarity === 'rare' ? 'border-blue-500 text-blue-700' : ''}
                      ${rarity === 'legendary' ? 'border-purple-500 text-purple-700' : ''}
                      ${rarity === 'mythic' ? 'border-orange-500 text-orange-700' : ''}
                      capitalize font-bold
                    `}>
                      {rarity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  {detector.price > 0 && !owned && (
                    <div className={`text-2xl font-bold ${affordable ? 'text-green-600' : 'text-red-600'}`}>
                      ${detector.price.toLocaleString()}
                    </div>
                  )}
                  {detector.price === 0 && (
                    <div className="text-green-600 font-bold">Free (Starter)</div>
                  )}
                </div>
                
                {!owned && (
                  <Button
                    onClick={() => onBuyDetector(detector)}
                    disabled={!canBuy}
                    className={canBuy ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600' : ''}
                  >
                    {!unlocked && (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Locked
                      </>
                    )}
                    {unlocked && !affordable && 'Not Enough Coins'}
                    {canBuy && 'Purchase'}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const renderShovelCard = (shovel, index) => {
    const affordable = canAfford(shovel);
    const unlocked = canUnlock(shovel);
    const owned = isOwnedShovel(shovel);
    const isCurrent = shovel.id === currentShovel.id;
    const canBuy = affordable && unlocked && !owned;

    return (
      <motion.div
        key={shovel.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className={`border-2 transition-all ${
          isCurrent ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50' :
          owned ? 'border-gray-300 bg-gray-50' :
          canBuy ? 'border-orange-400 bg-gradient-to-r from-orange-50 to-red-50 hover:shadow-lg' :
          'border-gray-300 bg-gray-50 opacity-60'
        }`}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{shovel.icon}</div>
                <div>
                  <CardTitle className="text-lg">{shovel.name}</CardTitle>
                  <Badge className={`mt-1 bg-gradient-to-r ${shovel.color} text-white capitalize`}>
                    {shovel.tier}
                  </Badge>
                </div>
              </div>
              {isCurrent && (
                <Badge className="bg-green-600 text-white">
                  <Check className="w-3 h-3 mr-1" />
                  Equipped
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-lg p-3 border">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Zap className="w-4 h-4" />
                    Click Radius
                  </div>
                  <div className="text-xl font-bold text-gray-900">+{shovel.clickRadiusBonus}px</div>
                </div>
                <div className="bg-white/60 rounded-lg p-3 border">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <DollarSign className="w-4 h-4" />
                    Value Bonus
                  </div>
                  <div className="text-xl font-bold text-green-600">×{shovel.valueMultiplier}</div>
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-3">
                <div className="text-sm font-semibold text-amber-900 mb-1">💡 Benefits:</div>
                <ul className="text-xs text-amber-800 space-y-1">
                  <li>• Easier to dig treasures with larger click radius</li>
                  <li>• Earn {Math.round((shovel.valueMultiplier - 1) * 100)}% more coins from each treasure!</li>
                </ul>
              </div>

              <div className="bg-white/60 rounded-lg p-3 border">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  Required Level
                </div>
                <div className={`text-xl font-bold ${unlocked ? 'text-green-600' : 'text-red-600'}`}>
                  Level {shovel.requiredLevel}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  {shovel.price > 0 && !owned && (
                    <div className={`text-2xl font-bold ${affordable ? 'text-green-600' : 'text-red-600'}`}>
                      ${shovel.price.toLocaleString()}
                    </div>
                  )}
                  {shovel.price === 0 && (
                    <div className="text-green-600 font-bold">Free (Starter)</div>
                  )}
                </div>
                
                {!owned && (
                  <Button
                    onClick={() => onBuyShovel(shovel)}
                    disabled={!canBuy}
                    className={canBuy ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' : ''}
                  >
                    {!unlocked && (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Locked
                      </>
                    )}
                    {unlocked && !affordable && 'Not Enough Coins'}
                    {canBuy && 'Purchase'}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <span className="text-3xl">🏪</span>
            Upgrade Shop
          </DialogTitle>
          <DialogDescription>
            Upgrade your equipment to find better treasures and earn more coins!
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {/* Player Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">💰</span>
                  <div>
                    <div className="text-sm text-amber-700">Your Balance</div>
                    <div className="text-2xl font-bold text-amber-900">${coins.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">⭐</span>
                  <div>
                    <div className="text-sm text-purple-700">Your Level</div>
                    <div className="text-2xl font-bold text-purple-900">Level {playerLevel}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="detectors" className="flex items-center gap-2">
                <span className="text-xl">🔍</span>
                Metal Detectors
              </TabsTrigger>
              <TabsTrigger value="shovels" className="flex items-center gap-2">
                <span className="text-xl">⛏️</span>
                Shovels
              </TabsTrigger>
            </TabsList>

            <TabsContent value="detectors" className="mt-6">
              <div className="grid gap-4">
                {DETECTOR_TIERS.map((detector, index) => renderDetectorCard(detector, index))}
              </div>
            </TabsContent>

            <TabsContent value="shovels" className="mt-6">
              <div className="grid gap-4">
                {SHOVEL_TIERS.map((shovel, index) => renderShovelCard(shovel, index))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}