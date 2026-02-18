import React from 'react';
import { Image as ImageIcon, Plus } from 'lucide-react';
import { currentJobAdditionalInfo } from '../../data/mockData';

const AdditionalInfoCard = () => {
  const { notes, attachments } = currentJobAdditionalInfo;
  const displayAttachments = attachments.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl px-4 shadow-sm">
      {/* Notes */}
      <div className="flex items-start justify-between gap-3 py-3 border-b border-gray-100">
        <span className="text-gray-600 text-sm flex-shrink-0">Notes</span>
        <p className="text-gray-900 font-medium text-sm text-right min-w-0 max-w-[180px] truncate">{notes}</p>
      </div>

      {/* Attachments - thumbnails stacked horizontally, max 3 */}
      <div className="flex items-center justify-between gap-3 py-3">
        <span className="text-gray-600 text-sm flex-shrink-0">Attachments</span>
        <div className="flex items-center gap-2 min-w-0 max-w-[180px]">
          {displayAttachments.map((att) => (
            <div
              key={att.id}
              className="w-6 h-6 rounded overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center"
            >
              {att.thumbnailUrl ? (
                <img
                  src={att.thumbnailUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon size={12} className="text-gray-400" />
              )}
            </div>
          ))}
          <button
            type="button"
            className="w-6 h-6 rounded overflow-hidden flex-shrink-0 flex items-center justify-center hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: 'rgba(0, 106, 86, 0.15)', color: '#006A56' }}
            title="Add attachment"
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoCard;
