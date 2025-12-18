import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore, calculatePregnancyWeek, getTrimester } from '@/store/appStore';
import { 
  User, Calendar, Bell, Phone, Plus, Trash2, 
  ChevronRight, Shield, Cloud, Baby
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export function Profile() {
  const { 
    profile, setProfile, 
    customEmergencyContacts, addEmergencyContact, removeEmergencyContact,
    setHasCompletedOnboarding 
  } = useAppStore();
  
  const [editingDueDate, setEditingDueDate] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [addingContact, setAddingContact] = useState(false);
  
  const [newName, setNewName] = useState(profile.name);
  const [newDueDate, setNewDueDate] = useState(profile.dueDate || '');
  const [newContact, setNewContact] = useState({ name: '', number: '', relationship: '' });

  const pregnancyInfo = profile.dueDate ? calculatePregnancyWeek(profile.dueDate) : null;
  const trimester = pregnancyInfo ? getTrimester(pregnancyInfo.week) : null;

  const handleSaveName = () => {
    setProfile({ name: newName });
    setEditingName(false);
  };

  const handleSaveDueDate = () => {
    setProfile({ dueDate: newDueDate || null });
    setEditingDueDate(false);
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.number) {
      addEmergencyContact(newContact);
      setNewContact({ name: '', number: '', relationship: '' });
      setAddingContact(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-sage px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
            <User size={40} className="text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-primary-foreground">
            {profile.name || 'Your Profile'}
          </h1>
          {trimester && (
            <p className="text-primary-foreground/80 mt-1">
              Trimester {trimester} • Week {pregnancyInfo?.week}
            </p>
          )}
        </div>
      </div>

      <div className="px-5 py-4 max-w-lg mx-auto space-y-6">
        {/* Profile Info */}
        <div className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Profile
          </h2>
          
          <Card variant="default" className="card-hover cursor-pointer" onClick={() => setEditingName(true)}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{profile.name || 'Not set'}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </CardContent>
          </Card>

          <Card variant="default" className="card-hover cursor-pointer" onClick={() => setEditingDueDate(true)}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blush-light flex items-center justify-center">
                  <Baby size={20} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium text-foreground">
                    {profile.dueDate 
                      ? new Date(profile.dueDate).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })
                      : 'Not set'}
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Emergency Contacts
            </h2>
            <Button variant="ghost" size="sm" onClick={() => setAddingContact(true)}>
              <Plus size={16} />
              Add
            </Button>
          </div>

          {customEmergencyContacts.length === 0 ? (
            <Card variant="soft">
              <CardContent className="p-4 text-center">
                <Phone size={24} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Add personal emergency contacts for quick access.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {customEmergencyContacts.map((contact, i) => (
                <Card key={i} variant="default">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <User size={20} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {contact.relationship} • {contact.number}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon-sm"
                      onClick={() => removeEmergencyContact(i)}
                    >
                      <Trash2 size={16} className="text-muted-foreground" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* App Info */}
        <div className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-foreground">
            About Mellow
          </h2>
          
          <Card variant="soft">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Privacy First</p>
                  <p className="text-sm text-muted-foreground">
                    All your data is stored locally on your device. Nothing is sent to external servers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="soft">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <Cloud size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Works Offline</p>
                  <p className="text-sm text-muted-foreground">
                    Full functionality without internet connection. Access health information anytime.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground pt-4">
          Mellow v1.0.0 • Made with care
        </p>
      </div>

      {/* Edit Name Sheet */}
      <Sheet open={editingName} onOpenChange={setEditingName}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="font-display text-xl">Edit Name</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 pb-8">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Your name"
              className="h-12"
            />
            <Button variant="sage" size="lg" className="w-full" onClick={handleSaveName}>
              Save
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Due Date Sheet */}
      <Sheet open={editingDueDate} onOpenChange={setEditingDueDate}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="font-display text-xl">Edit Due Date</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 pb-8">
            <Input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="h-12"
            />
            <Button variant="sage" size="lg" className="w-full" onClick={handleSaveDueDate}>
              Save
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add Contact Sheet */}
      <Sheet open={addingContact} onOpenChange={setAddingContact}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="font-display text-xl">Add Emergency Contact</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 pb-8">
            <Input
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              placeholder="Name"
              className="h-12"
            />
            <Input
              value={newContact.number}
              onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
              placeholder="Phone number"
              type="tel"
              className="h-12"
            />
            <Input
              value={newContact.relationship}
              onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
              placeholder="Relationship (e.g., Partner, Doctor)"
              className="h-12"
            />
            <Button 
              variant="sage" 
              size="lg" 
              className="w-full" 
              onClick={handleAddContact}
              disabled={!newContact.name || !newContact.number}
            >
              Add Contact
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
