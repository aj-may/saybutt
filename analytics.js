import mixpanel from 'mixpanel-browser';

mixpanel.init('cfafa3cebe9f5bbd044531c87c207f7d');

export const track = (collection, event) => {
  mixpanel.track(collection, event);
};

export const identify = user => {
  mixpanel.identify(user.uid);
  mixpanel.people.set({
    name: user.displayName,
    $email: user.email,
    $avatar: user.photoURL,
    // TODO: $created as mixpanel string "$created": "2013-04-01T13:20:00"
    creationTime: user.metadata.creationTime,
    lastSignInTime: user.metadata.lastSignInTime,
  });
};

export const reset = () => mixpanel.reset();
