import { Link } from 'lucide-react';

interface PlaidLinkButtonProps {
  onSuccess?: (publicToken: string) => void;
  className?: string;
}

export default function PlaidLinkButton({ onSuccess, className = '' }: PlaidLinkButtonProps) {
  const handleClick = () => {
    // In production, this would use usePlaidLink hook from react-plaid-link
    // For now, simulate the connection flow
    console.log('Plaid Link would open here');
    // Simulated success callback
    setTimeout(() => {
      onSuccess?.('mock_public_token_xxx');
    }, 2000);
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-athena-600 text-white text-sm font-semibold hover:bg-athena-700 active:bg-athena-800 transition-colors shadow-lg shadow-athena-600/25 ${className}`}
    >
      <Link className="w-4 h-4" />
      Link New Account
    </button>
  );
}
