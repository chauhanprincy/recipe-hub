import React, { useEffect, useState } from 'react';
import { LogOut, Mail, MapPin, Sparkles, UserCircle2 } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

const Profile = () => {
  const { profile, isSignedIn, signIn, updateProfile, signOut } = useProfile();
  const [signInForm, setSignInForm] = useState({ fullName: '', email: '' });
  const [detailsForm, setDetailsForm] = useState({
    bio: '',
    location: '',
    favoriteCuisine: '',
  });

  useEffect(() => {
    if (isSignedIn) {
      setDetailsForm({
        bio: profile.bio || '',
        location: profile.location || '',
        favoriteCuisine: profile.favoriteCuisine || '',
      });
    }
  }, [isSignedIn, profile.bio, profile.location, profile.favoriteCuisine]);

  const handleSignIn = (event) => {
    event.preventDefault();

    if (!signInForm.fullName.trim() || !signInForm.email.trim()) {
      return;
    }

    signIn(signInForm.fullName.trim(), signInForm.email.trim());
  };

  const handleDetailsSubmit = (event) => {
    event.preventDefault();

    updateProfile({
      bio: detailsForm.bio.trim(),
      location: detailsForm.location.trim(),
      favoriteCuisine: detailsForm.favoriteCuisine.trim(),
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 dark:bg-primary-900/30 px-3 py-1 text-sm font-medium text-primary-600 dark:text-primary-300">
          <Sparkles className="h-4 w-4" />
          Your RecipeHub profile
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          {isSignedIn ? 'Welcome back to your kitchen' : 'Create your personal profile'}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Sign in once, save your basic details, and keep your favorite culinary preferences close at hand.
        </p>
      </div>

      {!isSignedIn ? (
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass rounded-3xl p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary-100 dark:bg-primary-900/30 p-3">
                <UserCircle2 className="h-7 w-7 text-primary-600 dark:text-primary-300" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-500">Quick access</p>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sign in to start</h2>
              </div>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary-500" />
                Save your name and email in one place.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary-500" />
                Add a short bio and favorite cuisine.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary-500" />
                Keep everything synced in your browser.
              </li>
            </ul>
          </div>

          <form onSubmit={handleSignIn} className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Use your name and email to create your profile.
            </p>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Full name</span>
                <input
                  type="text"
                  value={signInForm.fullName}
                  onChange={(event) => setSignInForm((prev) => ({ ...prev, fullName: event.target.value }))}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  placeholder="Alex Johnson"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Email address</span>
                <input
                  type="email"
                  value={signInForm.email}
                  onChange={(event) => setSignInForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  placeholder="alex@example.com"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-primary-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-600"
            >
              Continue to profile
            </button>
          </form>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass rounded-3xl p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-500">Signed in</p>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  {profile.fullName || 'Your profile'}
                </h2>
              </div>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-primary-500 hover:text-primary-500 dark:border-gray-700 dark:text-gray-300"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>

            <div className="mt-6 space-y-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/60">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Mail className="h-4 w-4 text-primary-500" />
                <span>{profile.email || 'Add your email to stay connected.'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 text-primary-500" />
                <span>{profile.location || 'Share your city or region.'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Sparkles className="h-4 w-4 text-primary-500" />
                <span>{profile.favoriteCuisine || 'Choose a favorite cuisine.'}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleDetailsSubmit} className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit your details</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Update your bio, location, and flavor preferences whenever you want.
            </p>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Bio</span>
                <textarea
                  rows="3"
                  value={detailsForm.bio}
                  onChange={(event) => setDetailsForm((prev) => ({ ...prev, bio: event.target.value }))}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  placeholder="I love quick dinner ideas and cozy desserts."
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Location</span>
                  <input
                    type="text"
                    value={detailsForm.location}
                    onChange={(event) => setDetailsForm((prev) => ({ ...prev, location: event.target.value }))}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    placeholder="Barcelona"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Favorite cuisine</span>
                  <input
                    type="text"
                    value={detailsForm.favoriteCuisine}
                    onChange={(event) => setDetailsForm((prev) => ({ ...prev, favoriteCuisine: event.target.value }))}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    placeholder="Japanese"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-primary-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-600"
            >
              Save profile
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
