const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
    sections.forEach(section => {
        const position = section.getBoundingClientRect().top;
        if (position < window.innerHeight - 100) {
            section.classList.add("visible");
        }
    });
});

// Animation initiale pour les sections déjà visibles
sections.forEach(section => {
    const position = section.getBoundingClientRect().top;
    if (position < window.innerHeight) {
        section.classList.add("visible");
    }
});

function traduireFR() {
    document.getElementById("profilTitre").innerText = "PROFIL";
    document.getElementById("profilTexte").innerText = "Étudiant passionné par la sécurité informatique, le développement logiciel et le design graphique (UI/UX). Je développe des applications et des systèmes de gestion innovants.";
    
    document.getElementById("contactTitre").innerText = "CONTACT";
    document.getElementById("ville").innerText = "Yaoundé - Cameroun";
    
    document.getElementById("loisirTitre").innerText = "LOISIRS";
    document.getElementById("loisirTexte").innerText = "Design graphique, Veille technologique, Musique.";
    
    document.getElementById("langueTitre").innerText = "LANGUES";
    
    document.getElementById("poste").innerText = "ÉTUDIANT EN SÉCURITÉ INFORMATIQUE";
    
    document.getElementById("formationTitre").innerText = "FORMATION";
    document.getElementById("f1").innerText = "2025 - Présent : Licence 2 Sécurité Informatique (ICT4D) - Université de Yaoundé I";
    document.getElementById("f2").innerText = "2024 - 2025 : Licence 1 ICT4D - Université de Yaoundé I";
    document.getElementById("f3").innerText = "2024 : Baccalauréat";
    document.getElementById("f4").innerText = "2022 : Probatoire";

    document.getElementById("experienceTitre").innerText = "PROJETS & RÉALISATIONS";
    document.getElementById("p1").innerHTML = "<strong>MENTION237 :</strong> Plateforme éducative pour la réussite aux examens.";
    document.getElementById("p2").innerHTML = "<strong>EVALTRACK :</strong> Application de gestion des notes des étudiants.";
    document.getElementById("p3").innerHTML = "<strong>Gestion de restaurant :</strong> Système complet de gestion.";
    document.getElementById("p4").innerHTML = "<strong>Emploi du temps :</strong> Application de gestion scolaire.";

    document.getElementById("competenceTitre").innerText = "COMPÉTENCES";
    document.getElementById("c1").innerHTML = "<strong>Dév :</strong> Langage C, Algorithmique, Linux (Ubuntu)";
    document.getElementById("c2").innerHTML = "<strong>Sécurité :</strong> Analyse système, Machines virtuelles";
    document.getElementById("c3").innerHTML = "<strong>Design :</strong> Photoshop, Figma, Canva, UI/UX Design";

    document.getElementById("videoTitre").innerText = "VIDÉO DE PRÉSENTATION";
    document.getElementById("audioTitre").innerText = "AUDIO DE PRÉSENTATION";
}

function traduireEN() {
    document.getElementById("profilTitre").innerText = "PROFILE";
    document.getElementById("profilTexte").innerText = "Student passionate about cybersecurity, software development, and graphic design (UI/UX). I develop innovative applications and management systems.";
    
    document.getElementById("contactTitre").innerText = "CONTACT";
    document.getElementById("ville").innerText = "Yaounde - Cameroon";
    
    document.getElementById("loisirTitre").innerText = "HOBBIES";
    document.getElementById("loisirTexte").innerText = "Graphic Design, Tech Watch, Music.";
    
    document.getElementById("langueTitre").innerText = "LANGUAGES";
    
    document.getElementById("poste").innerText = "CYBERSECURITY STUDENT";
    
    document.getElementById("formationTitre").innerText = "EDUCATION";
    document.getElementById("f1").innerText = "2025 - Present: Bachelor's Degree Year 2 in Cybersecurity (ICT4D) - University of Yaounde I";
    document.getElementById("f2").innerText = "2024 - 2025: Bachelor's Degree Year 1 in ICT4D - University of Yaounde I";
    document.getElementById("f3").innerText = "2024: High School Diploma (Baccalaureate)";
    document.getElementById("f4").innerText = "2022: Probatory Certificate";

    document.getElementById("experienceTitre").innerText = "PROJECTS & ACHIEVEMENTS";
    document.getElementById("p1").innerHTML = "<strong>MENTION237:</strong> Educational platform for exam success.";
    document.getElementById("p2").innerHTML = "<strong>EVALTRACK:</strong> Student grade management application.";
    document.getElementById("p3").innerHTML = "<strong>Restaurant Management:</strong> Complete management system.";
    document.getElementById("p4").innerHTML = "<strong>School Timetable:</strong> School schedule management application.";

    document.getElementById("competenceTitre").innerText = "SKILLS";
    document.getElementById("c1").innerHTML = "<strong>Dev:</strong> C Language, Algorithmics, Linux (Ubuntu)";
    document.getElementById("c2").innerHTML = "<strong>Security:</strong> System analysis, Virtual machines";
    document.getElementById("c3").innerHTML = "<strong>Design:</strong> Photoshop, Figma, Canva, UI/UX Design";

    document.getElementById("videoTitre").innerText = "PRESENTATION VIDEO";
    document.getElementById("audioTitre").innerText = "PRESENTATION AUDIO";
}
