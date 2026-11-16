import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Conference } from '../../models/conference';

@Component({
  selector: 'app-list-conf',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-conf.html',
  styleUrl: './list-conf.css'
})
export class ListConf {
  // Liste des conférences
  conferences: Conference[] = [
    {
      id: 1,
      title: 'Angular & Modern Web Summit 2026',
      date: '2026-03-25',
      adrees: 'Palais des Congrès, Tunis',
      address: 'Palais des Congrès, Tunis',
      'available-Places': 35,
      availablePlaces: 35,
      picture: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      category: 'Web Development',
      description: 'Découvrez les dernières innovations Angular 21, SSR, architectures modulaires et performances front-end.',
      price: 120,
      speaker: 'Dr. Sarah Connor'
    },
    {
      id: 2,
      title: 'AI & Generative Models World Expo',
      date: '2026-04-12',
      adrees: 'Cité des Sciences, Tunis',
      address: 'Cité des Sciences, Tunis',
      'available-Places': 8,
      availablePlaces: 8,
      picture: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      category: 'Intelligence Artificielle',
      description: 'Plongez dans les LLMs de nouvelle génération, l\'IA multimodale et les cas d\'usage en entreprise.',
      price: 180,
      speaker: 'Prof. Alex Martin'
    },
    {
      id: 3,
      title: 'Cloud Native & DevOps Days',
      date: '2026-05-18',
      adrees: 'Technopole El Ghazala, Ariana',
      address: 'Technopole El Ghazala, Ariana',
      'available-Places': 50,
      availablePlaces: 50,
      picture: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      category: 'Cloud & DevOps',
      description: 'Kubernetes, microservices, observabilité et automatisation CI/CD à grande échelle.',
      price: 90,
      speaker: 'Eng. Yassine Ben Salem'
    },
    {
      id: 4,
      title: 'International Cybersecurity & Ethical Hacking',
      date: '2026-06-22',
      adrees: 'Hôtel Laico, Tunis',
      address: 'Hôtel Laico, Tunis',
      'available-Places': 12,
      availablePlaces: 12,
      picture: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      category: 'Cyber Sécurité',
      description: 'Ateliers pratiques, simulations d\'attaques en temps réel et meilleures pratiques Zero Trust.',
      price: 150,
      speaker: 'Marc Dupont'
    },
    {
      id: 5,
      title: 'Mobile App Summit (Flutter & React Native)',
      date: '2026-07-08',
      adrees: 'Sousse Palace Hôtel, Sousse',
      address: 'Sousse Palace Hôtel, Sousse',
      'available-Places': 0,
      availablePlaces: 0,
      picture: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
      category: 'Mobile Dev',
      description: 'Tendances du développement mobile multiplateforme, design UI/UX fluide et intégration d\'APIs.',
      price: 110,
      speaker: 'Leila Trabelsi'
    },
    {
      id: 6,
      title: 'Data Science & Big Data Summit',
      date: '2026-08-14',
      adrees: 'Technopark Sfax, Sfax',
      address: 'Technopark Sfax, Sfax',
      'available-Places': 22,
      availablePlaces: 22,
      picture: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
      category: 'Data Science',
      description: 'Extraction de valeur des données massives, pipelines temps réel et visualisation avancée.',
      price: 130,
      speaker: 'Karim Mansour'
    }
  ];

  // Filtres et recherche
  searchTerm: string = '';
  selectedCategory: string = 'all';
  sortBy: string = 'date';
  reservationMessage: string | null = null;
  reservedConferenceTitle: string | null = null;

  // Catégories uniques pour les boutons de filtre
  categories: string[] = [
    'all',
    'Web Development',
    'Intelligence Artificielle',
    'Cloud & DevOps',
    'Cyber Sécurité',
    'Mobile Dev',
    'Data Science'
  ];

  // Calcul du nombre total de places disponibles
  get totalAvailablePlaces(): number {
    return this.conferences.reduce((acc, conf) => acc + conf.availablePlaces, 0);
  }

  // Filtrage et tri des conférences
  get filteredConferences(): Conference[] {
    let result = this.conferences.filter(conf => {
      const matchSearch =
        conf.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        conf.adrees.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (conf.description && conf.description.toLowerCase().includes(this.searchTerm.toLowerCase()));

      const matchCategory =
        this.selectedCategory === 'all' || conf.category === this.selectedCategory;

      return matchSearch && matchCategory;
    });

    // Tri
    if (this.sortBy === 'date') {
      result = [...result].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.sortBy === 'places-asc') {
      result = [...result].sort((a, b) => a.availablePlaces - b.availablePlaces);
    } else if (this.sortBy === 'places-desc') {
      result = [...result].sort((a, b) => b.availablePlaces - a.availablePlaces);
    } else if (this.sortBy === 'title') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }

  // Action de réservation d'une place
  reservePlace(conf: Conference): void {
    if (conf.availablePlaces > 0) {
      conf.availablePlaces--;
      conf['available-Places'] = conf.availablePlaces;
      this.reservedConferenceTitle = conf.title;
      this.reservationMessage = `Félicitations ! Votre place pour "${conf.title}" a été réservée avec succès.`;

      // Masquer le message après 4 secondes
      setTimeout(() => {
        this.reservationMessage = null;
        this.reservedConferenceTitle = null;
      }, 4000);
    }
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
  }
}
