// components/user-card.tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Phone, Mail } from 'lucide-react'
import DeleteButton from './delete-button'
import { UserEditDialog } from './user-edit-dialog';
import { getUserById } from '@/app/actions/actions';
import { User } from '@/app/actions/schemas';

interface UserCardProps {
  userId: string;
}

console.log("UserCard module loaded");

export default async function UserCard({ userId }: UserCardProps) {
  const user: User | null = await getUserById(userId);

  if (!user || !user.name) {
    console.error("UserCard: Invalid user object", user);
    return <p>Error: Invalid user data</p>;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarFallback>{user.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <Badge variant="secondary" className="w-fit mt-1">ID: {user.id}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>{user.phoneNumber}</span>
        </div>
        {user.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <DeleteButton userId={user.id} />
        <UserEditDialog user={user} />
      </CardFooter>
    </Card>
  );
}
