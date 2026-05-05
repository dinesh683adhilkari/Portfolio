 "use client"

import * as React from 'react';

interface BranchContextType {
  branchName: string;
  setBranchName: (name: string) => void;
}

const BranchContext = React.createContext<BranchContextType | undefined>(undefined);

export function BranchProvider({ children }) {
  const [branchName, setBranchName] = React.useState('');

  return React.createElement(BranchContext.Provider, { value: { branchName, setBranchName } }, children);
}

export function useBranch() {
  const context = React.useContext(BranchContext);
  if (context === undefined) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
}

