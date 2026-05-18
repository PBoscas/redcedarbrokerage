import { sql } from '@/lib/db';
import { FadeIn } from '@/components/ui/motion';
import { Image, Upload, Film, FileText, File } from 'lucide-react';

const typeIcon: Record<string, typeof Image> = {
  image: Image,
  video: Film,
  document: FileText,
};

function guessType(fileType: string | null): string {
  if (!fileType) return 'file';
  if (fileType.startsWith('image')) return 'image';
  if (fileType.startsWith('video')) return 'video';
  return 'document';
}

function formatSize(bytes: number | null): string {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function MediaPage() {
  const media = await sql`
    SELECT id, url, filename, file_type, file_size, context, alt_text, created_at
    FROM media_assets
    ORDER BY created_at DESC
    LIMIT 50
  `;

  return (
    <div className="max-w-6xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">Media Library</h1>
            <p className="text-sm text-muted-foreground">
              Upload and manage images, videos, and documents.
            </p>
          </div>
        </div>
      </FadeIn>

      {media.length === 0 ? (
        <FadeIn delay={0.05}>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-16 w-16 rounded-full bg-sand-light flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-cedar/40" />
            </div>
            <h2 className="text-lg font-medium text-charcoal mb-1">No media uploaded yet.</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              Media assets will appear here once uploaded.
            </p>
          </div>
        </FadeIn>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {media.map((item, i) => {
            const mediaType = guessType(item.file_type);
            const Icon = typeIcon[mediaType] || File;
            return (
              <FadeIn key={item.id} delay={0.02 * (i + 1)}>
                <div className="group bg-white rounded-lg border border-border overflow-hidden hover:border-cedar/30 hover:shadow-sm transition-all">
                  <div className="aspect-square bg-sand-light flex items-center justify-center relative">
                    {item.url && mediaType === 'image' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.url} alt={item.alt_text || item.filename} className="object-cover w-full h-full" />
                    ) : (
                      <Icon className="h-8 w-8 text-cedar/30" />
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium text-charcoal truncate">{item.filename}</p>
                    <p className="text-[10px] text-muted-foreground">{formatSize(item.file_size)}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      )}
    </div>
  );
}
