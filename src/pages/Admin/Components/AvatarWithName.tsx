
interface AvatarWithNameProps {
  imageUrl: string
  name: string
}

export const AvatarWithName = ({ imageUrl, name }: AvatarWithNameProps) => (
  <div className="flex items-center gap-3 text-amber-900 font-medium">
    <img
      src={imageUrl}
      alt={name}
      className="w-9 h-9 rounded-full object-cover border border-amber-200"
    />
    {name}
  </div>
)
