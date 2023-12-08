interface Props{
    username: string;
    isUsernameTaken: boolean
}

const HeaderPage = ({isUsernameTaken,username} : Props) => {

  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-20 mb-10">
        <h1 className="text-5xl">Bienvenue sur notre chat en temps réel</h1>
        <p className="mt-5">
          Il y a des fonctionnalités d&apos;IA que vous pourrez découvrir !
        </p>
        {/* Afficher le nom d'utilisateur actuel s'il n'est pas pris */}
        {!isUsernameTaken && (
          <p className="text-gray-400">
            <i>Connecté(e) en tant que {username}</i>
          </p>
        )}
      </div>
    </div>
  );
};

export default HeaderPage;
