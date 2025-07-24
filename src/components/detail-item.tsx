
import * as React from 'react';

export const DetailItem = ({ label, value }: { label: string; value?: React.ReactNode }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-sm">{value || '-'}</p>
    </div>
);
